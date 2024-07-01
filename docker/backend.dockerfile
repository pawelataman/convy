FROM node:20-alpine

WORKDIR /app/client

COPY ./client/package*.json .

RUN npm install ci

COPY ./client .

COPY ./_proto/ ../_proto

CMD  ["npx", "nx","run", "backend:serve"]

EXPOSE 3000