const faker = require('faker')

module.exports = {
  up: async queryInterface => {
    const userIds = await queryInterface.sequelize
      .query(`SELECT id FROM users;`)
      .then(res => res[0].map(({ id }) => id))

    await queryInterface.bulkInsert(
      'groups',
      [...Array(40)].map(() => ({
        name: faker.name.firstName(),
        description: faker.lorem.sentence(),
        image: `fake/image${Math.floor(Math.random() * 3)}.jpg`,
        userId: userIds[Math.floor(Math.random() * userIds.length)],
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {}
    )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('groups', null, {})
  },
}
