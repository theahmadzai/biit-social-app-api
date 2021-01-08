const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  const Teacher = sequelize.define(
    'Teacher',
    {
      empNo: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
      },
      middleName: {
        type: DataTypes.STRING,
      },
      lastName: {
        type: DataTypes.STRING,
      },
      designation: {
        type: DataTypes.STRING,
      },
      permanentAddress: {
        type: DataTypes.STRING,
      },
      permanentCity: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      joiningDate: {
        type: DataTypes.DATE,
      },
      resignDate: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  )

  Teacher.associate = ({ User }) => {
    Teacher.hasOne(User, {
      foreignKey: 'username',
      targetKey: 'empNo',
      constraints: false,
      scope: {
        role: 'TEACHER',
      },
    })
  }

  return Teacher
}
