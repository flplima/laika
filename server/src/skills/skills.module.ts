import { Module } from '@nestjs/common';

import { BasicDialogsModule } from './basic-dialogs/basic-dialogs.module';
import { NotesModule } from './notes/notes.module';
import { BoredModule } from './bored/bored.module';
import { JokesModule } from './jokes/jokes.module';

@Module({
  imports: [
    BasicDialogsModule,
    BoredModule,
    JokesModule,
    NotesModule,
  ]
})
export class SkillsModule {}
