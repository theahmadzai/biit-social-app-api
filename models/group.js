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

  Group.associate = ({ User, GroupUser, Post, PostPostable }) => {
    Group.belongsTo(User, {
      as: 'Owner',
      foreignKey: 'UserId',
    })

    Group.belongsToMany(User, {
      through: GroupUser,
    })

    // Group.hasMany(Post, {
    //   foreignKey: 'postableId',
    //   constraints: false,
    //   scope: {
    //     postableType: 'GROUP',
    //   },
    // })

    Group.belongsToMany(Post, {
      through: {
        model: PostPostable,
        unique: false,
        scope: {
          postableType: 'GROUP',
        },
      },
      foreignKey: 'postableId',
      constraints: false,
    })
  }

  return Group
}
