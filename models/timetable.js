const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  const Timetable = sequelize.define(
    'Timetable',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      day: {
        type: DataTypes.STRING,
      },
      time: {
        type: DataTypes.STRING,
      },
      class: {
        type: DataTypes.STRING,
      },
      course: {
        type: DataTypes.STRING,
      },
      teacher: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  )

  Timetable.associate = () => {}

  return Timetable
}
