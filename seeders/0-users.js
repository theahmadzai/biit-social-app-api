module.exports = {
  up: async queryInterface => {
    const regNumbers = await queryInterface.sequelize
      .query(`SELECT regNo FROM students;`)
      .then(res => res[0].map(({ regNo }) => regNo))

    await queryInterface.bulkInsert(
      'users',
      regNumbers.map(regNo => ({
        username: regNo,
        password:
          '$2b$10$OGsUmtSzxGfTzK0yAS8bh.ZQ0rqnCua.cyvVZG6iBI2T96I2Fg20m',
        role: 'STUDENT',
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
