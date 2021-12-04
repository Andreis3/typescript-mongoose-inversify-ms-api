FROM node:16
WORKDIR /usr/src/typescript-mongoose-inversify-ms-api
COPY ./package.json .
RUN npm install --only=prod --force
