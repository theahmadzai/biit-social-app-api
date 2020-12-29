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
        type: DataTypes.ENUM(['STUDENT', 'TEACHER', 'ADMIN']),
        allowNull: false,
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

  User.associate = ({
    Student,
    Friendship,
    Group,
    UserGroup,
    Post,
    Comment,
  }) => {
    User.belongsTo(Student, {
      as: 'StudentProfile',
      foreignKey: 'username',
      sourceKey: 'regNo',
    })

    User.belongsToMany(User, {
      as: 'Requestees',
      through: Friendship,
      foreignKey: 'requesterId',
    })

    User.belongsToMany(User, {
      as: 'Requesters',
      through: Friendship,
      foreignKey: 'requesteeId',
    })

    User.hasMany(Group, {
      as: 'groupsOwned',
      foreignKey: 'userId',
      onDelete: 'NO ACTION',
    })

    User.belongsToMany(Group, {
      foreignKey: 'userId',
      through: UserGroup,
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
