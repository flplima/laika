import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SkillsModule } from './skills/skills.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGO_URI || 'mongodb://localhost/laika'
      }),
    }),
    CoreModule.register({
      language: 'en',
      notUnderstandMessage: 'I didn\'t understand what you mean :/',
      notKnowMessage: 'I don\'t know, sorry!',
      responseDelay: 1000,
    }),
    SkillsModule,
  ],
})
export class AppModule {}
