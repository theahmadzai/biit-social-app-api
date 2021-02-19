const faker = require('faker')

module.exports = {
  up: async queryInterface => {
    // const userGroup = await queryInterface.sequelize
    //   .query(`SELECT "UserId" FROM "GroupUsers"`)
    //   .then(res => res[0])
    // await queryInterface.bulkInsert(
    //   'Posts',
    //   [...Array(400)].map(() => {
    //     const { UserId } = userGroup[Math.floor(Math.random() * userGroup.length)]
    //     return {
    //       text: faker.lorem.paragraph(),
    //       secret: false,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //       UserId,
    //     }
    //   }),
    //   {}
    // )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('Posts', null, {})
  },
}
