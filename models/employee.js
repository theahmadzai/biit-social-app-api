const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  const Employee = sequelize.define(
    'Employee',
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
      permanentAddress: {
        type: DataTypes.STRING,
      },
      permanentCity: {
        type: DataTypes.STRING,
      },
      joiningDate: {
        type: DataTypes.DATE,
      },
      resignDate: {
        type: DataTypes.DATE,
      },
      phone: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      designation: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  )

  Employee.associate = ({ User }) => {
    Employee.hasOne(User, {
      foreignKey: 'username',
      targetKey: 'empNo',
      constraints: false,
      scope: {
        role: 'EMPLOYEE',
      },
    })
  }

  return Employee
}
