const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  const Group = sequelize.define(
    'Group',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  )

  Group.associate = ({ User, GroupMembership, Post }) => {
    Group.belongsTo(User, {
      as: 'Owner',
      foreignKey: 'UserId',
    })

    Group.belongsToMany(User, {
      through: GroupMembership,
    })

    Group.hasMany(Post)
  }

  return Group
}
