module.exports = {
  up: async queryInterface => {
    const classes = n => [...Array(n)].map(() => ['A', 'B', 'C', 'D', 'E'])

    await queryInterface.bulkInsert(
      'Classes',
      classes(8)
        .map((sections, semester) =>
          sections.map(name => ({
            name: `BCS-${semester + 1}${name}`,
            createdAt: new Date(),
            updatedAt: new Date(),
          }))
        )
        .flat(),
      {}
    )

    await queryInterface.bulkInsert(
      'Classes',
      classes(8)
        .map((sections, semester) =>
          sections.map(name => ({
            name: `BIT-${semester + 1}${name}`,
            createdAt: new Date(),
            updatedAt: new Date(),
          }))
        )
        .flat(),
      {}
    )

    await queryInterface.bulkInsert(
      'Classes',
      classes(4)
        .map((sections, semester) =>
          sections.map(name => ({
            name: `MCS-${semester + 1}${name}`,
            createdAt: new Date(),
            updatedAt: new Date(),
          }))
        )
        .flat(),
      {}
    )

    await queryInterface.bulkInsert(
      'Classes',
      classes(4)
        .map((sections, semester) =>
          sections.map(name => ({
            name: `MIT-${semester + 1}${name}`,
            createdAt: new Date(),
            updatedAt: new Date(),
          }))
        )
        .flat(),
      {}
    )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('Classes', null, {})
  },
}
