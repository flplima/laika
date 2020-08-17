import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Message } from "./message.schema";

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
  ) {}

  async create(data: { text: string, fromUser?: boolean }) {
    const message = new this.messageModel();
    message.text = data.text;
    message.fromUser = data.fromUser;
    await message.save();
    return message;
  }
}