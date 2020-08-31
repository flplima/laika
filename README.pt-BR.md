# Laika

A Laika é uma assitente pessoal open-source feita para desenvolvedores, pensada para ser fácil de ser adaptada.

**[Read me in English](https://github.com/felipelima555/laika/blob/master/README.md)**

É extremamente simples adicionar novas funcionalidades à Laika. Basta usar o decorator `@MessageHandler`, que irá injetar os metadados que ensinam a Laika como responder as suas mensagens.

<img src="https://user-images.githubusercontent.com/20775579/90994643-c10a8e80-e58f-11ea-9949-ac5594e09fc4.png" />

<img src="https://user-images.githubusercontent.com/20775579/90994647-c7990600-e58f-11ea-898f-c90aa748f221.gif" />

## Como começar

```bash
git clone https://github.com/felipelima555/laika
cd laika
yarn install
docker-compose up
```

O Docker Compose irá montar automaticamente todo o ambiente que a Laika precisa para funcionar, contendo o backend (NestJS), o frontend (React) e o servidor de banco de dados (MongoDB). Para mais informações veja o [docker-compose.yml](https://github.com/felipelima555/laika/blob/master/docker-compose.yml).

**Após iniciar o ambiente, abra seu navegador, acesse http://localhost:3000 e diga "Hello" para a Laika!**

_OBS.: Se você preferir não usar Docker, pode iniciar diretamente o backend com o comando `yarn start:dev` (no diretório server). Para o frontend, abra outro terminal e execute `yarn start` (no diretório client-web). Nesse caso, você precisará ter um servidor MongoDB ativo em localhost:27017._

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
- **React Context API** para gerenciamento de estado global.

### Backend (NestJS)

- **socket-io** para a comunicação com o frontend
- **node-nlp** para o processamento de linguagem natural
- **mongoose** para o banco de dados MongoDB
- **reflect-metadata** para adicionar e obter metadados usando decorators personalizados
- **rxjs** para stream de mensagens com Observables

O backend pode ser entendido através dos dois módulos principais:

- **src/core** - Aqui ficam o processamento de mensagens e o treinamento do algoritmo de inteligência artificial. Também ficam os decorators que serão usados no diretório de skills.
- **src/skills** - Aqui ficam os módulos que informam a Laika o que fazer. Usando o decorator `@MessageHandler` que é exportado da pasta src/core, a função será coletada pelo core e usada no processamento das mensagens. **Adicione seus próprios módulos aqui.**

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
