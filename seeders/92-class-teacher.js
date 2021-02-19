module.exports = {
  up: async queryInterface => {
    // const teacherIds = await queryInterface.sequelize
    //   .query(`SELECT "id" FROM "Users" WHERE role = 'TEACHER';`)
    //   .then(res => res[0].map(({ id }) => id))
    // const classIds = await queryInterface.sequelize
    //   .query(`SELECT "id" FROM "Classes";`)
    //   .then(res => res[0].map(({ id }) => id))
    // await queryInterface.bulkInsert(
    //   'ClassTeachers',
    //   [...Array(200)].map(() => ({
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     UserId: teacherIds[Math.floor(Math.random() * teacherIds.length)],
    //     ClassId: classIds[Math.floor(Math.random() * classIds.length)],
    //   })),
    //   {}
    // )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('ClassTeachers', null, {})
  },
}
