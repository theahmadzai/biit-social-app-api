const faker = require('faker')

module.exports = {
  up: async queryInterface => {
    // const userIds = await queryInterface.sequelize
    //   .query(`SELECT "id" FROM "Users";`)
    //   .then(res => res[0].map(({ id }) => id))
    // const postIds = await queryInterface.sequelize
    //   .query(`SELECT "id" FROM "Posts";`)
    //   .then(res => res[0].map(({ id }) => id))
    // await queryInterface.bulkInsert(
    //   'Comments',
    //   [...Array(500)].map(() => ({
    //     content: faker.lorem.sentence(),
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     UserId: userIds[Math.floor(Math.random() * userIds.length)],
    //     PostId: postIds[Math.floor(Math.random() * postIds.length)],
    //   })),
    //   {}
    // )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('Comments', null, {})
  },
}
