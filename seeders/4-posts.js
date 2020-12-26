const faker = require('faker')

module.exports = {
  up: async queryInterface => {
    const userGroup = await queryInterface.sequelize
      .query(`SELECT userId, groupId FROM user_group`)
      .then(res => res[0])

    await queryInterface.bulkInsert(
      'posts',
      [...Array(200)].map(() => {
        const { userId, groupId } = userGroup[
          Math.floor(Math.random() * userGroup.length)
        ]

        return {
          text: faker.lorem.paragraph(),
          userId: userId,
          groupId: groupId,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      }),
      {}
    )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('posts', null, {})
  },
}
