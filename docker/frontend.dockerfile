FROM        node:20-alpine as node

WORKDIR     /app

COPY        ./client/package*.json ./
RUN         npm install

COPY        ../client .
RUN         npx nx run frontend:build:production

FROM        node:20-alpine

WORKDIR     /usr/app

COPY        --from=node /app/dist/apps/frontend ./

EXPOSE      4000

CMD         ["node","server/server.mjs"]

