module.exports = {
  up: async queryInterface => {
    // const postIds = await queryInterface.sequelize
    //   .query(`SELECT "id" FROM "Posts";`)
    //   .then(res => res[0].map(({ id }) => id))
    // await queryInterface.bulkInsert(
    //   'Media',
    //   [...Array(40)].map(() => ({
    //     filename: `fake/image${Math.floor(Math.random() * 3)}.jpg`,
    //     mimetype: 'image/jpg',
    //     encoding: 'base64',
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //     PostId: postIds[Math.floor(Math.random() * postIds.length)],
    //   })),
    //   {}
    // )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('Media', null, {})
  },
}
