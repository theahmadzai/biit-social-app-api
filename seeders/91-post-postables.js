module.exports = {
  up: async queryInterface => {
    // const postIds = await queryInterface.sequelize
    //   .query(`SELECT "id" FROM "Posts";`)
    //   .then(res => res[0].map(({ id }) => id))
    // const groupIds = await queryInterface.sequelize
    //   .query(`SELECT "id" FROM "Groups";`)
    //   .then(res => res[0].map(({ id }) => id))
    // const classIds = await queryInterface.sequelize
    //   .query(`SELECT "id" FROM "Classes";`)
    //   .then(res => res[0].map(({ id }) => id))
    // await queryInterface.bulkInsert(
    //   'PostPostables',
    //   postIds.splice(0, Math.ceil(postIds.length / 3)).map(postId => ({
    //     postId,
    //     postableId: groupIds[Math.floor(Math.random() * groupIds.length)],
    //     postableType: 'GROUP',
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   })),
    //   {}
    // )
    // await queryInterface.bulkInsert(
    //   'PostPostables',
    //   postIds.map(postId => ({
    //     postId,
    //     postableId: classIds[Math.floor(Math.random() * classIds.length)],
    //     postableType: 'CLASS',
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   })),
    //   {}
    // )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('PostPostables', null, {})
  },
}
