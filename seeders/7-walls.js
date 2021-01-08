module.exports = {
  up: async queryInterface => {
    await queryInterface.bulkInsert(
      'Walls',
      [
        {
          name: 'BIIT WALL',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('Walls', null, {})
  },
}
