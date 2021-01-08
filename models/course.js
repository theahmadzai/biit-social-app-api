const { DataTypes } = require('sequelize')

module.exports = sequelize =>
  sequelize.define(
    'Course',
    {
      code: {
        type: DataTypes.STRING,
        field: 'course_no',
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        field: 'title',
      },
      description: {
        type: DataTypes.STRING,
        field: 'course_desc',
      },
    },
    {
      // tableName: 'course',
      timestamps: false,
    }
  )
