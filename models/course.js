const { DataTypes } = require('sequelize')

module.exports = sequelize =>
  sequelize.define(
    'Course',
    {
      code: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        field: 'title',
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  )
