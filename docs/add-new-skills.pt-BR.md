## Adicione novas skills

A parte mais legal da Laika é que é extremamente fácil adicionar novas skills. Basta usar o sistema de modules/services do NestJS. Começe com os comandos abaixo:

```bash
cd server
yarn nest generate module skills/my-awesome-skill
yarn nest generate service skills/my-awesome-skill
```

O NestJS irá criar o diretório `skills/my-awesome-skill`, contendo um _module_ e um _service_, e irá injetar o novo módulo nas dependências do `skills.module.ts`. Tudo o que precisamos fazer agora é editar o nosso arquivo `my-awesome-skill.service.ts`.

Agora vamos importar o decorator @MessageHandler de `src/core` para ensinar a Laika uma nova função. Copie e cole o exemplo abaixo no seu arquivo `my-awesome-skill.service.ts`:

```typescript
import { Injectable } from "@nestjs/common";

import { MessageHandler } from "src/core";

@Injectable()
export class MyAwesomeSkillService {
  /**
   * Exemplo 1
   * O decorator @MessageHandler é usado para informar ao core
   * para adicionar a frase e essa função ao processamento de mensagens.
   * Nesse caso, quando você disser "this is a test",
   * a Laika irá responder "It works!"
   */
  @MessageHandler("This is a test")
  testing() {
    return `It works!`;
  }
}
```

Salve o arquivo e o servidor irá reiniciar automaticamente, aprendendo os novos recursos. Depois, volte ao navegador e teste a nova função.

![test](https://user-images.githubusercontent.com/20775579/90997595-5ad63980-e598-11ea-9b57-41f9f069b70d.gif)

Você pode adicionar várias funções na mesma classe, basta usar o decorator @MessageHandler e a Laika irá aprendê-las. Experimente copiar e colar o código abaixo no seu `my-awesome-skill.service` para mais exemplos.

```typescript
import { Injectable } from "@nestjs/common";
import { range, of } from "rxjs";
import { delay, concatMap } from "rxjs/operators";

import { MessageHandler, MessageText, TrimEntity } from "src/core";

@Injectable()
export class MyAwesomeSkillService {
  /**
   * Exemplo 1
   * O decorator @MessageHandler é usado para informar ao core
   * para adicionar a frase e essa função ao processamento de mensagens.
   * Nesse caso, quando você disser "this is a test",
   * a Laika irá responder "It works!"
   */
  @MessageHandler("This is a test")
  testing() {
    return `It works!`;
  }

  /**
   * Exemplo 2
   * Você pode treinar várias frases para uma mesma função.
   */
  @MessageHandler(["Say my message", "Repeat my message"])
  repeatMessage(
    // Use o decorator @MessageText para injetar sua própria mensagem
    @MessageText() myMessage: string
  ) {
    // Retornando um array, uma resposta aleatória será escolhida.
    return [`You said: ${myMessage}`, `Your message was "${myMessage}"`];
  }

  /**
   * Exemplo 3
   * Você pode retornar um objeto contendo o texto e uma função
   * para criar diálogos mais complexos
   */
  @MessageHandler("Say my name")
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
  @MessageHandler("Count from %n1% to %n2%")
  count(
    // Você pode extrair dados com o decorator @TrimEntity
    @TrimEntity("n1", { between: ["from", "to"] }) n1?: string,
    @TrimEntity("n2", { after: "to" }) n2?: string
  ) {
    const fromNumber = parseInt(n1, 10) || 0;
    const toNumber = parseInt(n2, 10) || 0;
    const response$ = range(fromNumber, 1 + toNumber - fromNumber).pipe(
      concatMap((n) => of(n).pipe(delay(500)))
    );

    // Retorne um Observable<string> para criar um stream de mensagens
    return response$;
  }
}
```

Salve o arquivo e o servidor irá reiniciar automaticamente, aprendendo os novos recursos. Depois, volte ao navegador e teste algumas das frases.

**Agora você está pronto para começar a criar sua própria assistente pessoal!**

Dê uma olhada nos outros diretórios em src/skills para mais exemplos.
