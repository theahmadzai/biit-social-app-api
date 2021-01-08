module.exports = {
  up: async queryInterface => {
    const userIds = await queryInterface.sequelize
      .query(`SELECT id FROM users;`)
      .then(res => res[0].map(({ id }) => id))

    const groupIds = await queryInterface.sequelize
      .query(`SELECT id FROM groups;`)
      .then(res => res[0].map(({ id }) => id))

    await queryInterface.bulkInsert(
      'GroupMemberships',
      groupIds.map(groupId => ({
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: '2017-ARID-0264',
        GroupId: groupId,
      })),
      {}
    )

    await queryInterface.bulkInsert(
      'GroupMemberships',
      groupIds.map(groupId => ({
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: '2017-ARID-0262',
        GroupId: groupId,
      })),
      {}
    )

    await queryInterface.bulkInsert(
      'GroupMemberships',
      [...Array(100)].map(() => ({
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: userIds[Math.floor(Math.random() * userIds.length)],
        GroupId: groupIds[Math.floor(Math.random() * groupIds.length)],
      })),
      {}
    )
  },

  down: async queryInterface => {
    await queryInterface.bulkDelete('GroupMemberships', null, {})
  },
}
