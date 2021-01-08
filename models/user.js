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
      timestamps: true,
    }
  )

  User.associate = ({
    Student,
    Teacher,
    Friendship,
    Group,
    GroupMembership,
    Post,
    Comment,
  }) => {
    User.belongsTo(Student, {
      as: 'StudentProfile',
      foreignKey: 'username',
      sourceKey: 'regNo',
      constraints: false,
    })

    User.belongsTo(Teacher, {
      as: 'TeacherProfile',
      foreignKey: 'username',
      sourceKey: 'empNo',
      constraints: false,
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
      as: 'GroupsOwned',
    })

    User.belongsToMany(Group, {
      through: GroupMembership,
    })

    User.hasMany(Post)

    User.hasMany(Comment)
  }

  return User
}
