FROM node:20-alpine

WORKDIR /app

RUN npm i -g nx

COPY ./client/package*.json .

RUN npm install ci

COPY ./client/ .

CMD  ["npx", "nx","run", "frontend:serve","--host=0.0.0.0","--disable-host-check"]

EXPOSE 4200