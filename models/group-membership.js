module.exports = sequelize => {
  const GroupMembership = sequelize.define(
    'GroupMembership',
    {},
    {
      timestamps: true,
    }
  )

  return GroupMembership
}
