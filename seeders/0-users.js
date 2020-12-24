const faker = require('faker')

module.exports = {
  up: async queryInterface => {
    const roles = ['student', 'teacher', 'admin']

    await queryInterface.bulkInsert(
      'users',
      [...Array(100)].map((...[, index]) => ({
        username: `2017-ARID-${100 + index}`,
        password:
          '$2b$10$OGsUmtSzxGfTzK0yAS8bh.ZQ0rqnCua.cyvVZG6iBI2T96I2Fg20m',
        role: roles[Math.floor(Math.random() * roles.length)],
        image: `fake/profile${Math.floor(Math.random() * 3)}.jpg`,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {}
    )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('users', null, {})
  },
}
