const faker = require('faker')

module.exports = {
  up: async queryInterface => {
    const group_membership = await queryInterface.sequelize
      .query(`SELECT userId, groupId FROM group_membership`)
      .then(res => res[0])

    await queryInterface.bulkInsert(
      'posts',
      [...Array(200)].map(() => {
        const { userId, groupId } = group_membership[
          Math.floor(Math.random() * group_membership.length)
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
