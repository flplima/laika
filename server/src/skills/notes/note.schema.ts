import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Note extends Document {
  @Prop({ required: true })
  text: string;

  @Prop({ type: Date, default: () => new Date() })
  createdAt: Date;
}

export const NoteSchema = SchemaFactory.createForClass(Note);
