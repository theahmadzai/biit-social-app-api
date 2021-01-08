module.exports = {
  up: async queryInterface => {
    const userIds = await queryInterface.sequelize
      .query(`SELECT id FROM users;`)
      .then(res => res[0].map(({ id }) => id))

    const groupIds = await queryInterface.sequelize
      .query(`SELECT id FROM groups;`)
      .then(res => res[0].map(({ id }) => id))

    const ids = await queryInterface.sequelize
      .query(
        `SELECT id from Users WHERE username in ('2017-ARID-0264','2017-ARID-0262');`
      )
      .then(res => res[0].map(({ id }) => id))

    await queryInterface.bulkInsert(
      'GroupUsers',
      groupIds.map(groupId => ({
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: ids[0],
        GroupId: groupId,
      })),
      {}
    )

    await queryInterface.bulkInsert(
      'GroupUsers',
      groupIds.map(groupId => ({
        createdAt: new Date(),
        updatedAt: new Date(),
        UserId: ids[1],
        GroupId: groupId,
      })),
      {}
    )

    await queryInterface.bulkInsert(
      'GroupUsers',
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
    await queryInterface.bulkDelete('GroupUsers', null, {})
  },
}
