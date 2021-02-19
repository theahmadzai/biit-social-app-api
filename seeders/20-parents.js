module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert(
      'Parents',
      [...Array(5)].map(i => ({
        cnic: `00000-0000000-${i}`,
        password: '$2b$10$OGsUmtSzxGfTzK0yAS8bh.ZQ0rqnCua.cyvVZG6iBI2T96I2Fg20m',
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {}
    )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('Parents', null, {})
  },
}
