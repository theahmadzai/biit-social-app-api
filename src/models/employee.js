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
      // firstName: {
      //   type: DataTypes.STRING,
      //   field: 'Emp_firstname',
      // },
      // lastName: {
      //   type: DataTypes.STRING,
      //   field: 'Emp_lastname',
      // },
      // middleName: {
      //   type: DataTypes.STRING,
      //   field: 'Emp_middle',
      // },
      // designation: {
      //   type: DataTypes.STRING,
      //   field: 'Dsgn_no',
      // },
      // permanentAddress: {
      //   type: DataTypes.STRING,
      //   field: 'Per_address',
      // },
      // permanentCity: {
      //   type: DataTypes.STRING,
      //   field: 'Per_city',
      // },
      // currentAddress: {
      //   type: DataTypes.STRING,
      //   field: 'Pr_address',
      // },
      // currentCity: {
      //   type: DataTypes.STRING,
      //   field: 'Pr_city',
      // },
      // phone: {
      //   type: DataTypes.STRING,
      //   field: 'Res_telno',
      // },
      // email: {
      //   type: DataTypes.STRING,
      //   field: 'Emp_email',
      // },
      // joiningDate: {
      //   type: DataTypes.DATE,
      //   field: 'Joining_date',
      // },
      // resignDate: {
      //   type: DataTypes.DATE,
      //   field: 'Resign_date',
      // },
      // status: {
      //   type: DataTypes.STRING,
      //   field: 'Status',
      // },
      // nic: {
      //   type: DataTypes.STRING,
      //   field: 'NIC',
      // },
    },
    {
      tableName: 'employee',
      timestamps: false,
    }
  )
