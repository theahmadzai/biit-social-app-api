const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  const UserGroup = sequelize.define(
    'UserGroup',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'user_group',
      timestamps: true,
    }
  )

  return UserGroup
}
