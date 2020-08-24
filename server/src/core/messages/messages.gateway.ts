import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { CoreService } from "../core.service";
import { MessagesService } from "./messages.service";
import { Inject } from "@nestjs/common";
import { CORE_MODULE_OPTIONS } from "../constants";
import { CoreModuleOptions } from "../core.module";
import { Observable } from "rxjs";

@WebSocketGateway()
export class MessagesGateway {
  constructor(
    private messagesService: MessagesService,
    private coreService: CoreService,
    @Inject(CORE_MODULE_OPTIONS) private coreModuleOptions: CoreModuleOptions,
  ) {}

  @WebSocketServer()
  io: Server;

  @SubscribeMessage('message')
  async onMessage(
    @MessageBody() data: any,
  ) {
    const userMessage = await this.messagesService.create({
      text: data.text,
      fromUser: true,
    });
    this.io.emit('message', userMessage);

    const [response] = await Promise.all([
      this.coreService.runMessageHandler(userMessage.text),
      new Promise(resolve => setTimeout(resolve, this.coreModuleOptions.responseDelay)),
    ]);

    if (response instanceof Observable) {
      response.subscribe(text => this.createAndEmitReponse(text));
    } else {
      this.createAndEmitReponse(response as string);
    }
  }

  async createAndEmitReponse(text: string) { 
    const responseMessage = await this.messagesService.create({ text });
    this.io.emit('message', responseMessage);
  }
}
