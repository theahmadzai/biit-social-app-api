module.exports = {
  up: async queryInterface => {
    const userIds = await queryInterface.sequelize
      .query(`SELECT id FROM users;`)
      .then(res => res[0].map(({ id }) => id))

    const groupIds = await queryInterface.sequelize
      .query(`SELECT id FROM groups;`)
      .then(res => res[0].map(({ id }) => id))

    await queryInterface.bulkInsert(
      'group_membership',
      [...Array(30)].map(() => ({
        userId: userIds[Math.floor(Math.random() * userIds.length)],
        groupId: groupIds[Math.floor(Math.random() * groupIds.length)],
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      {}
    )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('group_membership', null, {})
  },
}
