const { DataTypes } = require('sequelize')

module.exports = sequelize =>
  sequelize.define(
    'Student',
    {
      regNo: {
        type: DataTypes.STRING,
        field: 'reg_no',
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        field: 'st_firstname',
      },
      middleName: {
        type: DataTypes.STRING,
        field: 'st_middlename',
      },
      lastName: {
        type: DataTypes.STRING,
        field: 'st_lastname',
      },
      fatherName: {
        type: DataTypes.STRING,
        field: 'father_name',
      },
      sex: {
        type: DataTypes.STRING,
        field: 'sex',
      },
      birthDate: {
        type: DataTypes.DATE,
        field: 'birth_date',
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
        field: 'per_telno',
      },
      session: {
        type: DataTypes.STRING,
        field: 'sess',
      },
      admissionDate: {
        type: DataTypes.DATE,
        field: 'adm_date',
      },
      semester: {
        type: DataTypes.STRING,
        field: 'semester_no',
      },
      remarks: {
        type: DataTypes.STRING,
        field: 'remarks',
      },
      status: {
        type: DataTypes.STRING,
        field: 'st_status',
      },
      section: {
        type: DataTypes.STRING,
        field: 'section',
      },
    },
    {
      tableName: 'student',
      timestamps: false,
    }
  )
