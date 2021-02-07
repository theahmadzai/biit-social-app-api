const faker = require('faker')

module.exports = {
  up: async queryInterface => {
    const count = await queryInterface.sequelize
      .query('SELECT COUNT(*) FROM "Employees";')
      .then(res => res[0][0]['count'])

    if (parseInt(count) === 0) {
      await queryInterface.bulkInsert(
        'Employees',
        [...Array(200)].map((_, i) => ({
          empNo: `BIIT${i}`,
          firstName: faker.name.prefix(),
          middleName: faker.name.firstName(),
          lastName: faker.name.lastName(),
          permanentAddress: faker.address.streetAddress(),
          permanentCity: faker.address.city(),
          joiningDate: faker.date.between('1997', '2021'),
          resignDate: faker.date.between('1997', '2021'),
          phone: faker.phone.phoneNumber(),
          email: faker.internet.email(),
          designation: faker.random.arrayElement(['D1', 'D2', 'D3']),
          status: faker.random.arrayElement(['LEFT', 'PERMANENT', 'VISITING']),
        })),
        {}
      )
    }
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('Employees', null, {})
  },
}
