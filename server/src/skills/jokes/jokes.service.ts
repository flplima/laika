import { Injectable, HttpService } from '@nestjs/common';
import { MessageHandler } from 'src/core';

@Injectable()
export class JokesService {
  constructor(
    private http: HttpService,
  ) {}

  @MessageHandler([
    'Tell me a joke',
    'Tell jokes',
    'Say something funny',
  ])
  async tellJoke() {
    const { data } = await this.http.get(
      'https://official-joke-api.appspot.com/jokes/random',
    ).toPromise();

    return {
      text: data.setup,
      nextCallback: () => data.punchline,
    };
  }
}
