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
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'groups',
      timestamps: true,
    }
  )

  Group.associate = ({ User, UserGroup, Post }) => {
    Group.belongsTo(User, {
      as: 'owner',
      foreignKey: 'userId',
    })

    Group.belongsToMany(User, {
      as: 'Members',
      foreignKey: 'groupId',
      through: UserGroup,
    })

    Group.hasMany(Post, {
      foreignKey: 'groupId',
    })
  }

  return Group
}
