const faker = require('faker')

module.exports = {
  up: async queryInterface => {
    const regNumbers = await queryInterface.sequelize.query(`SELECT "regNo" FROM "Students";`).then(res => res[0].map(({ regNo }) => regNo))

    await queryInterface.bulkInsert(
      'Users',
      regNumbers.map(regNo => ({
        username: regNo,
        password: '$2b$10$OGsUmtSzxGfTzK0yAS8bh.ZQ0rqnCua.cyvVZG6iBI2T96I2Fg20m',
        role: 'STUDENT',
        image: `fake/avatar${Math.floor(Math.random() * 2)}.jpg`,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {}
    )

    const empNumbers = await queryInterface.sequelize.query(`SELECT "empNo" FROM "Employees";`).then(res => res[0].map(({ empNo }) => empNo))

    await queryInterface.bulkInsert(
      'Users',
      empNumbers.map(empNo => ({
        username: empNo,
        password: '$2b$10$OGsUmtSzxGfTzK0yAS8bh.ZQ0rqnCua.cyvVZG6iBI2T96I2Fg20m',
        role: faker.random.arrayElement(['TEACHER', 'ADMIN']),
        image: `fake/avatar${Math.floor(Math.random() * 2)}.jpg`,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {}
    )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('Users', null, {})
  },
}
