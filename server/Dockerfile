FROM node:12-alpine

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --silent

COPY . .

CMD yarn start:dev