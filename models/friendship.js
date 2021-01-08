const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  const Friendship = sequelize.define(
    'Friendship',
    {
      statusCode: {
        type: DataTypes.ENUM(['PENDING', 'ACCEPTED', 'DECLINED', 'BLOCKED']),
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  )

  return Friendship
}
