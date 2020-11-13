const { DataTypes } = require('sequelize')

module.exports = sequelize =>
  sequelize.define(
    'Employee',
    {
      empNo: {
        type: DataTypes.STRING,
        field: 'emp_no',
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        field: 'emp_firstname',
      },
      lastName: {
        type: DataTypes.STRING,
        field: 'emp_lastname',
      },
      middleName: {
        type: DataTypes.STRING,
        field: 'emp_middle',
      },
      designation: {
        type: DataTypes.STRING,
        field: 'dsgn_no',
      },
      permanentAddress: {
        type: DataTypes.STRING,
        field: 'per_address',
      },
      permanentCity: {
        type: DataTypes.STRING,
        field: 'per_city',
      },
      currentAddress: {
        type: DataTypes.STRING,
        field: 'pr_address',
      },
      currentCity: {
        type: DataTypes.STRING,
        field: 'pr_city',
      },
      phone: {
        type: DataTypes.STRING,
        field: 'res_telno',
      },
      email: {
        type: DataTypes.STRING,
        field: 'emp_email',
      },
      joiningDate: {
        type: DataTypes.DATE,
        field: 'joining_date',
      },
      resignDate: {
        type: DataTypes.DATE,
        field: 'resign_date',
      },
      status: {
        type: DataTypes.STRING,
        field: 'status',
      },
      nic: {
        type: DataTypes.STRING,
        field: 'nic',
      },
    },
    {
      tableName: 'employee',
      timestamps: false,
    }
  )
