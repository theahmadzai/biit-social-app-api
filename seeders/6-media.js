module.exports = {
  up: async queryInterface => {
    const postIds = await queryInterface.sequelize
      .query(`SELECT id FROM posts;`)
      .then(res => res[0].map(({ id }) => id))

    await queryInterface.bulkInsert(
      'media',
      [...Array(40)].map(() => ({
        filename: `fake/image${Math.floor(Math.random() * 3)}.jpg`,
        mimetype: 'image/jpg',
        encoding: 'base64',
        postId: postIds[Math.floor(Math.random() * postIds.length)],
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {}
    )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('media', null, {})
  },
}
