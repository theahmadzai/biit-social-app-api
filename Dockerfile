ARG NODE_VERSION
FROM node:${NODE_VERSION}
WORKDIR /home/app
RUN npm i -g nodemon
COPY package.json ./
RUN npm install
COPY . .
