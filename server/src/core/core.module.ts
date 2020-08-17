import { Module, DynamicModule } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs-plus/discovery';
import { MongooseModule } from '@nestjs/mongoose';

import { NlpService } from './nlp/nlp.service';
import { CoreService } from './core.service';
import { MessagesGateway } from './messages/messages.gateway';
import { Message, MessageSchema } from './messages/message.schema';
import { MessagesService } from './messages/messages.service';
import { CORE_MODULE_OPTIONS } from './constants';

export interface CoreModuleOptions {
  language: string;
  notUnderstandMessage: string;
  notKnowMessage: string;
  responseDelay: number;
}

@Module({})
export class CoreModule {
  static register(options: CoreModuleOptions): DynamicModule {
    return {
      module: CoreModule,
      imports: [
        MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
        DiscoveryModule,
      ],
      providers: [
        { provide: CORE_MODULE_OPTIONS, useValue: options },
        NlpService,
        MessagesService,
        MessagesGateway,
        CoreService,
      ]
    }
  }
}
