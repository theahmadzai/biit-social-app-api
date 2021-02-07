const faker = require('faker')

module.exports = {
  up: async queryInterface => {
    const exists = await queryInterface.sequelize
      .query('SELECT COUNT(*) as count FROM "Students";')
      .then(res => res[0].map(({ count }) => count))

    if (!exists) {
      await queryInterface.bulkInsert(
        'Students',
        [...Array(3000)].map((_, i) => ({
          regNo: `2017-ARID-0${i}`,
          firstName: faker.name.firstName(),
          middleName: faker.random.arrayElement([faker.name.firstName(), '']),
          lastName: faker.name.lastName(),
          sex: faker.random.arrayElement(['M', 'F']),
          birthDate: faker.date.past(),
          permanentAddress: faker.address.streetAddress(),
          permanentCity: faker.address.city(),
          phone: faker.phone.phoneNumber(),
          session: faker.random.arrayElement(['A', 'B']),
          admissionDate: faker.date.between('1997', '2021'),
          semester: faker.random.number(8),
          section: faker.random.arrayElement(['A', 'B', 'C', 'D']),
          program: faker.random.arrayElement(['BCS', 'BIT', 'MCS', 'MIT']),
        })),
        {}
      )
    }
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('Students', null, {})
  },
}
