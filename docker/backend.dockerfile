FROM node:20-alpine

WORKDIR /app

COPY ./client/package*.json .

RUN npm install

COPY ../client .

RUN npx nx run backend:build:production

CMD ["node","dist/apps/backend/main.js"]







