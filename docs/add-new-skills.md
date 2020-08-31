## Add new skills

The coolest part about Laika is that it’s extremely easy to add new skills. Just use the NestJS modules/services system. Start with the commands below:

```bash
cd server
yarn nest generate module skills/my-awesome-skill
yarn nest generate service skills/my-awesome-skill
```

NestJS will create the directory `skills/my-awesome-skill`, containing a _module_ and a _service_, and will inject the new module into the facilities of `skills.module.ts`. All we need to do after is to edit our `my-awesome-skill.service.ts` file.

Lastly, import the @MessageHandler decorator from `src/core` to teach Laika a new function. Copy and paste the example below into your `my-awesome-skill.service.ts` file:

```typescript
import { Injectable } from "@nestjs/common";

import { MessageHandler } from "src/core";

@Injectable()
export class MyAwesomeSkillService {
  /**
   * Example 1
   * The @MessageHandler decorator is used to inform the core
   * to add the phrase and that function to message processing.
   * In that case, when you say "this is a test",
   * Laika will answer "It works!"
   */
  @MessageHandler("This is a test")
  testing() {
    return `It works!`;
  }
}
```

Save the file and the server will automatically restart, learning the new features. Then, return to the browser and test the new function.

![test](https://user-images.githubusercontent.com/20775579/90997595-5ad63980-e598-11ea-9b57-41f9f069b70d.gif)

You can add multiple functions in the same class, just use the @MessageHandler decorator and Laika will learn them. Try copying and pasting the code below into your `my-awesome-skill.service` for more examples.

```typescript
import { Injectable } from "@nestjs/common";
import { range, of } from "rxjs";
import { delay, concatMap } from "rxjs/operators";

import { MessageHandler, MessageText, TrimEntity } from "src/core";

@Injectable()
export class MyAwesomeSkillService {
  /**
   * Example 1
   * The @MessageHandler decorator is used to inform the core
   * to add the phrase and that function to message processing.
   * In that case, when you say "this is a test",
   * Laika will answer "It works!"
   */
  @MessageHandler("This is a test")
  testing() {
    return `It works!`;
  }

  /**
   * Example 2
   * You can train multiple sentences for the same function.
   */
  @MessageHandler(["Say my message", "Repeat my message"])
  repeatMessage(
    // Use the @MessageText decorator to inject your own message
    @MessageText() myMessage: string
  ) {
    // Returning an array, a random response will be chosen.
    return [`You said: ${myMessage}`, `Your message was "${myMessage}"`];
  }

  /**
   * Example 3
   * You can return an object containing the text and a function
   * to create more complex dialogues
   */
  @MessageHandler("Say my name")
  sayMyName() {
    return {
      text: `What's your name?`,
      nextCallback: (text: string) => `Your name is ${text}`,
    };
  }

  /**
   * Example 4
   * This is a slightly more complex example
   * In this case, if you say "Count from 1 to 10" Laika will
   * reply with a stream of 10 messages.
   */
  @MessageHandler("Count from %n1% to %n2%")
  count(
    // You can extract data with the @TrimEntity decorator
    @TrimEntity("n1", { between: ["from", "to"] }) n1?: string,
    @TrimEntity("n2", { after: "to" }) n2?: string
  ) {
    const fromNumber = parseInt(n1, 10) || 0;
    const toNumber = parseInt(n2, 10) || 0;
    const response$ = range(fromNumber, 1 + toNumber - fromNumber).pipe(
      concatMap((n) => of(n).pipe(delay(500)))
    );

    // Return an Observable <string> to create a message stream
    return response$;
  }
}
```

Save the file and the server will automatically restart, learning the new features. Then, return to the browser and test some of the phrases.

**Now you're ready to start creating your own personal assistant!**

Take a look at the other directories in src / skills for more examples.
