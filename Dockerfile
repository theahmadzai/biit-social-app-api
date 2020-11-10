ARG NODE_VERSION
FROM node:${NODE_VERSION}
WORKDIR /home/node/app
RUN npm i -g nodemon
COPY package.json ./
RUN npm install
COPY . .
ENTRYPOINT [ "nodemon", "-L", "src/index.js"]