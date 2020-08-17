import { Injectable, HttpService } from '@nestjs/common';
import { MessageHandler } from 'src/core';

@Injectable()
export class BoredService {
  constructor(
    private http: HttpService,
  ) {}

  @MessageHandler([
    'I\'m bored',
    'Tell me what to do',
  ])
  async run() {
    const { data } = await this.http.get(
      'https://www.boredapi.com/api/activity',
    ).toPromise();

    return data.activity;
  }
}
