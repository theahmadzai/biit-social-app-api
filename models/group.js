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
      logo: {
        type: DataTypes.STRING,
      },
      cover: {
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        onDelete: 'NO ACTION',
      },
    },
    {
      tableName: 'groups',
      timestamps: true,
    }
  )

  Group.associate = ({ User, Post }) => {
    Group.belongsTo(User, {
      as: 'owner',
      foreignKey: 'userId',
    })

    Group.belongsToMany(User, {
      as: 'Members',
      foreignKey: 'groupId',
      through: 'group_membership',
      onDelete: 'NO ACTION',
    })

    Group.hasMany(Post, {
      foreignKey: 'groupId',
    })
  }

  return Group
}
