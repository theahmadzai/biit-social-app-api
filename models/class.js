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
    },
    {
      timestamps: true,
    }
  )

  Class.associate = ({ Post }) => {
    Class.hasMany(Post, {
      foreignKey: 'postableId',
      constraints: false,
      scope: {
        postableType: 'CLASS',
      },
    })
  }

  return Class
}
