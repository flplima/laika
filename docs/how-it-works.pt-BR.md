# Como a Laika funciona?

Podemos separar o funcionamento da Laika em duas etapas: O treinamento da IA e o processamento das mensagens.

## Treinamento

O treinamento é realizado uma vez quando o servidor NestJS inicia. Cada vez que você modifica o código e salva o arquivo o servidor reinicia automaticamente (graças ao live reload do comando yarn start:dev) e o treinamento é reexecutado.
O código abaixo é executado pelo core.service.ts quando o servidor inicia:

```typescript
async onApplicationBootstrap() {
    const methods = await this.discovery.providerMethodsWithMetaAtKey(MESSAGE_HANDLER_METADATA);
    methods.forEach(method => this.registerMessageHandler(method));
    await this.nlpService.train();
  }
```

1. Primeiro, descobrimos todos os métodos que foram decorados com o @MessageHandler. Para funcionar, é necessário que a classe seja usada como provider em algum módulo da aplicação. Por questões de organização, devem ser módulos dentro do [skills.module.ts](https://github.com/flplima/laika/blob/master/server/src/skills/skills.module.ts).

2. Para cada método, chamamos a função _registerMessageHandler_, ela irá pegar as frases que foram usadas como parâmetro do @MessageHandler e adicionar ao treinamento da IA usando o pacote node-nlp. Basicamente, o node-nlp precisa de uma string de entrada e uma de saída. A de entrada é a frase que está no @MessageHandler, e para a saída é feita uma string usando o nome da classe e o nome do método no seguinte formato: "parentClassName.methodName". Assim, Laika irá saber posteriormente qual função chamar quando receber uma mensagem.

3. Por último, é feito o treinamento da rede usando o método train().

## Processamento da mensagem

As mensagens do usuário chegam no servidor e são recebidas no [messages.gateway.ts](https://github.com/flplima/laika/blob/master/server/src/core/messages/messages.gateway.ts). Veja como funciona:

1. A mensagem do usuário chega no servidor através do evento "message";
2. A mensagem é salva no banco de dados MongoDB na collection "message";
3. É executada a função this.coreService.runMessageHandler que irá passar o texto do usuário para o node-nlp e receber o método mais próximo de acordo com o treinamento. Laika irá executar a função recebida e usar o retorno da função para responder a mensagem. A mensagem de resposta também é salva no banco de dados MongoDB.
4. O servidor emite a mensagem de resposta para o frontend.
