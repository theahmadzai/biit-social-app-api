const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  const Class = sequelize.define(
    'Class',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      timestamps: true,
    }
  )

  Class.associate = ({ Post, PostPostable, User, ClassTeacher }) => {
    // Class.hasMany(Post, {
    //   foreignKey: 'postableId',
    //   constraints: false,
    //   scope: {
    //     postableType: 'CLASS',
    //   },
    // })

    Class.belongsToMany(Post, {
      through: {
        model: PostPostable,
        unique: false,
        scope: {
          postableType: 'CLASS',
        },
      },
      foreignKey: 'postableId',
      constraints: false,
    })

    Class.belongsToMany(User, {
      through: ClassTeacher,
    })
  }

  return Class
}
