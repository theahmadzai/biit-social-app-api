const { DataTypes } = require('sequelize')

module.exports = sequelize =>
  sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        field: 'first_name',
      },
      middleName: {
        type: DataTypes.STRING,
        field: 'middle_name',
      },
      lastName: {
        type: DataTypes.STRING,
        field: 'last_name',
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: 'app_users',
      timestamps: false,
    }
  )
