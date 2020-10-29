FROM node:lts-alpine

WORKDIR /home/node/app

RUN npm i -g nodemon

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

CMD ["nodemon", "src/index.js"]