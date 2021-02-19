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
    Employee,
    Class,
    ClassTeacher,
    Parent,
    ParentChild,
    Group,
    GroupUser,
    Post,
    Like,
    Comment,
  }) => {
    User.belongsTo(Student, {
      as: 'StudentProfile',
      foreignKey: 'username',
      sourceKey: 'regNo',
      constraints: false,
    })

    User.belongsTo(Employee, {
      as: 'EmployeeProfile',
      foreignKey: 'username',
      sourceKey: 'empNo',
      constraints: false,
    })

    User.hasMany(Group, {
      as: 'GroupsOwned',
    })

    User.belongsToMany(Group, {
      through: GroupUser,
    })

    User.belongsToMany(Class, {
      through: ClassTeacher,
    })

    User.belongsToMany(Parent, {
      through: ParentChild,
    })

    User.hasMany(Post)

    User.hasMany(Like)

    User.hasMany(Comment)
  }

  return User
}
