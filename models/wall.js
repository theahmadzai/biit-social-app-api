const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  const Wall = sequelize.define(
    'Wall',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // tableName: 'walls',
      timestamps: true,
    }
  )

  Wall.associate = () => {}

  return Wall
}
