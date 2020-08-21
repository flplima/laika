# Laika

A Laika é uma assitente pessoal open-source feita para desenvolvedores, pensada para ser fácil de ser implantada e adaptada.

Você pode ensinar a Laika a executar funções em resposta a suas mensagens. Dentro das funções a Laika pode fazer requisições a APIs externas, extrair informações das suas mensagens e salvar no banco de dados MongoDB integrado, ou simplesmente responder qualquer texto que você quiser.

## Como começar

```bash
git clone https://github.com/felipelima555/laika
cd laika
yarn install
docker-compose up
```

O Docker Compose irá montar automaticamente todo o ambiente que a Laika precisa para funcionar, contendo o backend (NestJS), o frontend (React) e o servidor de banco de dados (MongoDB). Para mais informações veja o [docker-compose.yml](https://github.com/felipelima555/laika/blob/master/docker-compose.yml).

OBS.: Se você preferir não usar Docker, pode iniciar diretamente o backend com o comando `yarn start:dev` (no diretório server). Para o frontend, abra outro terminal e execute `yarn start` (no diretório client-web). Nesse caso, você precisará ter um servidor MongoDB ativo em localhost:27017.

**Após iniciar o ambiente, abra seu navegador, acesse http://localhost:3000 e diga "Hello" para a Laika!**

Veja algumas coisas que você pode dizer para a Laika:

- Who are you?
- How are you?
- Tell me a joke
- I'm bored, tell me what to do
- Save the note buy milk
- Show all my notes
- Show notes about milk

## Tecnologias usadas

### Frontent (React)
- **styled-components** para estilização
- **socket-io.client** para enviar/receber mensagens do servidor
- **React Context API** para gerenciamento de estado.

### Backend (NestJS)
- **socket-io** para a comunicação com o frontend
- **node-nlp** para o processamento de linguagem natural
- **mongoose** para o banco de dados MongoDB
- **reflect-metadata** para adicionar e obter metadados usando decorators personalizados
- **rxjs** para stream de mensagens com Observables

O backend pode ser entendido através dos dois módulos principais:

- **src/core** - Aqui ficam o processamento de mensagens e o treinamento do algoritmo de inteligência artificial. Também ficam os decorators que serão usados no diretório de skills.
- **src/skills** - Aqui ficam os módulos que informam a Laika o que fazer. Usando o decorator ```@MessageHandler``` que é exportado da pasta src/core, a função será coletada pelo core e usada no processamento das mensagens.

## Adicione novas skills
A parte mais legal da Laika é que é extremamente fácil adicionar novas skills. Basta usar o sistema de modules/services do NestJS. 

```bash
cd server
yarn nest generate module skills/my-awesome-skill
yarn nest generate service skills/my-awesome-skill
```

O NestJS irá criar o diretório ```skills/my-awesome-skill```, contendo um *module* e um *service*, e irá injetar o novo módulo nas dependências do ```skills.module.ts```. Tudo o que precisamos fazer agora é editar o nosso arquivo `my-awesome-skill.service.ts`.

Comece copiando e colando o exemplo abaixo no seu arquivo `my-awesome-skill.service.ts`:

```typescript
import { Injectable } from '@nestjs/common';
import { range, of } from 'rxjs';
import { delay, concatMap } from 'rxjs/operators';

import { MessageHandler, MessageText, TrimEntity } from 'src/core';

@Injectable()
export class MyAwesomeSkillService {

  /**
   * Exemplo 1
   * O decorator @MessageHandler é usado para informar ao core
   * para adicionar a frase e essa função ao processamento de mensagens.
   * Nesse caso, quando você disser "this is an test",
   * a Laika irá responder "It's works!"
   */
  @MessageHandler('This is an test')
  testing() {
    return `It's works!`;
  }

  /**
   * Exemplo 2
   * Você pode treinar várias frases para uma mesma função.
   */
  @MessageHandler(['Say my message', 'Repeat my message'])
  repeatMessage(
    // Use o decorator @MessageText para injetar sua própria mensagem
    @MessageText() myMessage: string,
  ) {
    // Retornando um array, uma resposta aleatória será escolhida.
    return [
      `You said: ${myMessage}`,
      `Your message was "${myMessage}"`,
    ];
  }

  /**
   * Exemplo 3
   * Você pode retornar um objeto contendo o texto e uma função
   * para criar diálogos mais complexos
   */
  @MessageHandler('Say my name')
  sayMyName() {
    return {
      text: `What's your name?`,
      nextCallback: (text: string) => `Your name is ${text}`,
    };
  }

  /**
   * Exemplo 4
   * Este é um exemplo um pouco mais complexo
   * Nesse caso, se você disser "Count from 1 to 10" a Laika irá
   * responder com um stream de 10 mensagens.
   */
  @MessageHandler('Count from %n1% to %n2%')
  count(
    // Você pode extrair dados com o decorator @TrimEntity
    @TrimEntity('n1', { between: ['from', 'to'] }) n1?: string,
    @TrimEntity('n2', { after: 'to' }) n2?: string,
  ) {
    const fromNumber = parseInt(n1, 10) || 0;
    const toNumber = parseInt(n2, 10) || 0;
    const response$ = range(fromNumber, 1 + toNumber - fromNumber)
      .pipe( concatMap(n => of(n).pipe(delay(500))) );

    // Retorne um Observable<string> para criar um stream de mensagens
    return response$;
  }

}
```

Salve o arquivo e o servidor irá reiniciar automaticamente, aprendendo os novos recursos. Depois, volte ao navegador e teste algumas das frases.

**Agora você está pronto para começar a criar sua própria assistente pessoal!**

Dê uma olhada nos outros diretórios em src/skills para mais exemplos.

## Contribua
A Laika ainda está em desenvolvimento e toda contribuição é bem-vinda! Abaixo segue uma lista com o que eu gostaria de melhorar:

## TODO
- Exibir mensagens antigas ao abrir o app
- Fala para texto e texto para fala
- Docker Swarm para deploy
- Tratamento de exceções
- Testes automatizados
- Hot word (ativar com o comando de voz "Hey Laika!")
- Transformar o app React em um progressive web app (PWA)
- Notificações de novas mensagens, mesmo quando o app estiver fora de foco

## Autor
Meu nome é **Felipe Lima** e você pode entrar em contato comigo pelo meu [LinkedIn](https://www.linkedin.com/in/felipelimadasilva/).
