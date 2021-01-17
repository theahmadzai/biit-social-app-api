const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  const Datesheet = sequelize.define(
    'Datesheet',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
      },
      time: {
        type: DataTypes.STRING,
      },
      day: {
        type: DataTypes.STRING,
      },
      date: {
        type: DataTypes.STRING,
      },
      class: {
        type: DataTypes.STRING,
      },
      course: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  )

  Datesheet.associate = () => {}

  return Datesheet
}
