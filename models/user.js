const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUppercase: true,
        },
      },
      image: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'users',
      timestamps: true,
    }
  )

  User.associate = ({ Group, Post, Comment }) => {
    User.hasMany(Group, {
      as: 'groupsOwned',
      foreignKey: 'userId',
    })

    User.belongsToMany(Group, {
      foreignKey: 'userId',
      through: 'group_membership',
    })

    User.hasMany(Post, {
      foreignKey: 'userId',
    })

    User.hasMany(Comment, {
      foreignKey: 'userId',
    })
  }

  return User
}
