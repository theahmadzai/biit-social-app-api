const faker = require('faker')

module.exports = {
  up: async queryInterface => {
    const userIds = await queryInterface.sequelize
      .query(`SELECT id FROM users;`)
      .then(res => res[0].map(({ id }) => id))

    const postIds = await queryInterface.sequelize
      .query(`SELECT id FROM posts;`)
      .then(res => res[0].map(({ id }) => id))

    await queryInterface.bulkInsert(
      'comments',
      [...Array(30)].map(() => ({
        content: faker.lorem.sentence(),
        userId: userIds[Math.floor(Math.random() * userIds.length)],
        postId: postIds[Math.floor(Math.random() * postIds.length)],
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {}
    )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('comments', null, {})
  },
}
