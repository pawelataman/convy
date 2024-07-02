FROM node:20-alpine

WORKDIR /app/client

RUN npm i -g nx

COPY ./client/package*.json .

RUN npm install ci

COPY ./client/ .

COPY ./_proto/ ../_proto

CMD  ["npx", "nx","run", "backend:serve", "--verbose"]

EXPOSE 3000