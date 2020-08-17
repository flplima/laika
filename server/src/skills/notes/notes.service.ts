import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { MessageHandler, TrimEntity } from 'src/core';
import { Note } from './note.schema';
import { of } from 'rxjs';
import { delay, concatMap } from 'rxjs/operators';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(Note.name) private noteModel: Model<Note>,
  ) {}

  @MessageHandler([
    'Save note %myNote%',
    'Keep note %myNote%',
  ])
  async saveNote(
    @TrimEntity('myNote', {
      afterFirst: 'note',
    }) myNote?: string,
  ) {
    if (!myNote) {
      return {
        text: `Write the note you want to save`,
        nextCallback: (text: string) => this.saveNote(text),
      };
    }
    const note = new this.noteModel();
    note.text = myNote;
    await note.save();
    return `Your note "${myNote}" has been saved!`;
  }

  @MessageHandler([
    'Find notes about %searchQuery%',
    'Look for notes about %searchQuery%',
  ])
  async searchNotes(
    @TrimEntity('searchQuery', {
      afterFirst: 'about',
    }) searchQuery?: string,
  ) {
    const notes = await this.noteModel.find({
      text: { $regex: searchQuery || '', $options: 'i' },
    });
    if (!notes.length) {
      return `No notes about "${searchQuery}" were found`;
    }
    const response$ = of(
      `I found ${notes.length} note${notes.length > 1 ? 's' : ''} about "${searchQuery}"!`,
      ...notes.map(note => note.text),
    ).pipe(
      concatMap(text => of(text).pipe(delay(500))),
    );
    return response$;
  }

  @MessageHandler([
    'Find my notes',
    'Find all my notes',
    'Get all my notes',
  ])
  async getAllNotes() {
    const notes = await this.noteModel.find();
    if (!notes.length) {
      return `You have no notes`;
    }
    const response$ = of(
      `I found ${notes.length} note${notes.length > 1 ? 's' : ''}!`,
      ...notes.map(note => note.text),
    ).pipe(
      concatMap(text => of(text).pipe(delay(500))),
    );
    return response$;
  }
}
