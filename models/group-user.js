module.exports = sequelize => {
  const GroupUser = sequelize.define(
    'GroupUser',
    {},
    {
      timestamps: true,
    }
  )

  return GroupUser
}
