import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { NotesService } from './notes.service';
import { Note, NoteSchema } from './note.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
  ],
  providers: [NotesService],
})
export class NotesModule {}
