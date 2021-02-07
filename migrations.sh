#!/bin/sh
npm run sequelize db:seed --seed 3-users
npm run sequelize db:seed --seed 4-groups
npm run sequelize db:seed --seed 5-group-users
npm run sequelize db:seed --seed 6-posts
npm run sequelize db:seed --seed 7-likes
npm run sequelize db:seed --seed 8-comments
npm run sequelize db:seed --seed 9-media
