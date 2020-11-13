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
      appNo: {
        type: DataTypes.STRING,
        field: 'app_no',
      },
      firstName: {
        type: DataTypes.STRING,
        field: 'st_firstname',
      },
      lastName: {
        type: DataTypes.STRING,
        field: 'st_lastname',
      },
      middleName: {
        type: DataTypes.STRING,
        field: 'st_middlename',
      },
      fatherName: {
        type: DataTypes.STRING,
        field: 'father_name',
      },
      email: {
        type: DataTypes.STRING,
        field: 'st_email',
      },
      sex: {
        type: DataTypes.STRING,
        field: 'sex',
      },
      uaarRegNo: {
        type: DataTypes.STRING,
        field: 'uaar_reg_no',
      },
      maritalStatus: {
        type: DataTypes.STRING,
        field: 'marital_status',
      },
      birthDate: {
        type: DataTypes.DATE,
        field: 'birth_date',
      },
      nic: {
        type: DataTypes.STRING,
        field: 'nic_no',
      },
      currentAddress: {
        type: DataTypes.STRING,
        field: 'pr_address',
      },
      currentCity: {
        type: DataTypes.STRING,
        field: 'pr_city',
      },
      permanentAddress: {
        type: DataTypes.STRING,
        field: 'per_address',
      },
      permanentCity: {
        type: DataTypes.STRING,
        field: 'per_city',
      },
      phone: {
        type: DataTypes.STRING,
        field: 'per_telno',
      },
      admissionStatus: {
        type: DataTypes.STRING,
        field: 'ad_status',
      },
      session: {
        type: DataTypes.STRING,
        field: 'sess',
      },
      prefOne: {
        type: DataTypes.STRING,
        field: 'pref_1',
      },
      prefTwo: {
        type: DataTypes.STRING,
        field: 'pref_2',
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
