const faker = require('faker')

module.exports = {
  up: async queryInterface => {
    const userIds = ['2017-ARID-0264', '2017-ARID-0262']

    await queryInterface.bulkInsert(
      'Groups',
      [...Array(10)].map(() => ({
        name: faker.name.firstName(),
        description: faker.lorem.sentence(),
        image: `fake/image${Math.floor(Math.random() * 3)}.jpg`,
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: userIds[Math.floor(Math.random() * userIds.length)],
      })),
      {}
    )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('Groups', null, {})
  },
}
