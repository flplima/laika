# How does Laika work?

We can understand how Laika works in two steps: AI training and message processing.

## Training

Training takes place once when the NestJS server starts. Each time you modify the code and save the file, the server automatically restarts (thanks to the live reload of the yarn start: dev command) and the training is re-executed.
The code below is executed by core.service.ts when the server starts:

```typescript
async onApplicationBootstrap() {
    const methods = await this.discovery.providerMethodsWithMetaAtKey(MESSAGE_HANDLER_METADATA);
    methods.forEach(method => this.registerMessageHandler(method));
    await this.nlpService.train();
  }
```

1. First, we discover all the methods that have been decorated with @MessageHandler. To work, it is necessary that the class is used as a provider in some application module. For organizational reasons, they must be modules within [skills.module.ts](https://github.com/flplima/laika/blob/master/server/src/skills/skills.module.ts).

2. For each method, we call the _registerMessageHandler_ function, it will take the phrases that were used as a parameter of @MessageHandler and add to the AI ​​training using the node-nlp package. Basically, node-nlp needs an input and an output string. The input is the phrase that is in @MessageHandler, and for the output a string is made using the class name and the method name in the following format: "parentClassName.methodName". This way, Laika will later know which function to call when receiving a message.

3. Finally, the network is trained using train() method.

## Message processing

User messages arrive at the server and are received at [messages.gateway.ts](https://github.com/flplima/laika/blob/master/server/src/core/messages/messages.gateway.ts). Here's how it works:

1. The user's message arrives at the server through the "message" event;
2. The message is saved in the MongoDB database in the "message" collection;
3. The this.coreService.runMessageHandler function is executed, which will pass the user's text to node-nlp and receive the closest method according to the training. Laika will execute the received function and use the function's return to reply to the message. The reply message is also saved in the MongoDB database.
4. The server issues the response message to the frontend.
