# Laika

Laika is an open-source personal assistant made for developers, designed to be easy to adapt.

**[Leia-me em português](https://github.com/felipelima555/laika/blob/master/README.pt-BR.md)**

It's extremely simple to add skills to Laika. Just use decorator `@MessageHandler` in your methods, which will inject the metadata that teach Laika how to respond to your messages.

<img src="https://user-images.githubusercontent.com/20775579/90994643-c10a8e80-e58f-11ea-9949-ac5594e09fc4.png" />

<img src="https://user-images.githubusercontent.com/20775579/90994647-c7990600-e58f-11ea-898f-c90aa748f221.gif" />

## Getting started

```bash
git clone https://github.com/felipelima555/laika
cd laika
yarn install
docker-compose up
```

Docker Compose will automatically set up the entire environment Laika needs to work, containing backend (NestJS), frontend (React) and the database server (MongoDB). For more information see [docker-compose.yml](https://github.com/felipelima555/laika/blob/master/docker-compose.yml).

**After starting the environment, open your browser, go to http://localhost:3000 and say "Hello" to Laika!**

_NOTE: If you prefer not using Docker, you can directly start the backend with the command `yarn start:dev` (in the server directory). For the frontend, open another terminal and run `yarn start` (in the client-web directory). In this case, you will need to have a MongoDB server active at localhost:27017._

Here are some things you can say to Laika:

- Who are you?
- How are you?
- Tell me a joke
- I'm bored, tell me what to do
- Save note buy milk
- Show all my notes
- Show notes about milk

## Technologies

### Frontent (React)

- **styled-components** for styling
- **socket-io.client** to send / receive messages from the server
- **React Context API** for global state management.

### Backend (NestJS)

- **socket-io** for communication with the frontend
- **node-nlp** for natural language processing
- **mongoose** for MongoDB database
- **reflect-metadata** to add and get metadata using custom decorators
- **rxjs** to stream messages with Observables

The backend can be understood through two main modules:

- **src/core** - Here are the message processing and the artificial intelligence's algorithm training. There are also decorators that will be used in the skills directory.
- **src/skills** - Here are the modules that tell Laika what to do. Using the decorator `@MessageHandler` which is exported from the src/core folder, the function will be collected by the core and used in the processing of messages. **Add your own modules here.**

## Contributing

Laika is still in development and any contribution is welcome! Below is a list of what I would like to improve:

## TODO

- Show old messages when opening the app
- Speech to text and text to speech
- Docker Swarm for deploy
- Exception handling
- Automated testing
- Hot word (activate with the voice command "Hey Laika!")
- Transform React app into a progressive web app (PWA)
- Notifications of new messages, even when the app is out of focus

## Author

I'm **Felipe Lima** and you can contact me through my [LinkedIn](https://www.linkedin.com/in/felipelimadasilva/).
