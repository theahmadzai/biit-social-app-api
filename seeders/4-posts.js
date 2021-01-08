const faker = require('faker')

module.exports = {
  up: async queryInterface => {
    const userGroup = await queryInterface.sequelize
      .query(`SELECT UserId, GroupId FROM GroupMemberships`)
      .then(res => res[0])

    await queryInterface.bulkInsert(
      'Posts',
      [...Array(200)].map(() => {
        const { UserId, GroupId } = userGroup[
          Math.floor(Math.random() * userGroup.length)
        ]

        return {
          text: faker.lorem.paragraph(),
          createdAt: new Date(),
          updatedAt: new Date(),
          UserId,
          GroupId,
        }
      }),
      {}
    )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('Posts', null, {})
  },
}
