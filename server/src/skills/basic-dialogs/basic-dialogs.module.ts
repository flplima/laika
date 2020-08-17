import { Module } from '@nestjs/common';
import { BasicDialogsService } from './basic-dialogs.service';

@Module({
  providers: [BasicDialogsService],
})
export class BasicDialogsModule {}
