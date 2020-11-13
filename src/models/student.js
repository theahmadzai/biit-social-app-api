const { DataTypes } = require('sequelize')

module.exports = sequelize =>
  sequelize.define(
    'Student',
    {
      regNo: {
        type: DataTypes.STRING,
        field: 'Reg_No',
        primaryKey: true,
      },
      appNo: {
        type: DataTypes.STRING,
        field: 'App_no',
      },
      firstName: {
        type: DataTypes.STRING,
        field: 'St_firstname',
      },
      lastName: {
        type: DataTypes.STRING,
        field: 'St_lastname',
      },
      middleName: {
        type: DataTypes.STRING,
        field: 'St_middlename',
      },
      fatherName: {
        type: DataTypes.STRING,
        field: 'Father_name',
      },
      email: {
        type: DataTypes.STRING,
        field: 'St_email',
      },
      sex: {
        type: DataTypes.STRING,
        field: 'Sex',
      },
      uaarRegNo: {
        type: DataTypes.STRING,
        field: 'Uaar_reg_no',
      },
      maritalStatus: {
        type: DataTypes.STRING,
        field: 'Marital_status',
      },
      birthDate: {
        type: DataTypes.DATE,
        field: 'Birth_date',
      },
      nic: {
        type: DataTypes.STRING,
        field: 'Nic_no',
      },
      currentAddress: {
        type: DataTypes.STRING,
        field: 'Pr_address',
      },
      currentCity: {
        type: DataTypes.STRING,
        field: 'Pr_city',
      },
      permanentAddress: {
        type: DataTypes.STRING,
        field: 'Per_address',
      },
      permanentCity: {
        type: DataTypes.STRING,
        field: 'Per_city',
      },
      phone: {
        type: DataTypes.STRING,
        field: 'Per_telno',
      },
      admissionStatus: {
        type: DataTypes.STRING,
        field: 'Ad_status',
      },
      session: {
        type: DataTypes.STRING,
        field: 'Sess',
      },
      prefOne: {
        type: DataTypes.STRING,
        field: 'Pref_1',
      },
      prefTwo: {
        type: DataTypes.STRING,
        field: 'Pref_2',
      },
      admissionDate: {
        type: DataTypes.DATE,
        field: 'Adm_date',
      },
      semester: {
        type: DataTypes.STRING,
        field: 'Semester_no',
      },
      remarks: {
        type: DataTypes.STRING,
        field: 'Remarks',
      },
      status: {
        type: DataTypes.STRING,
        field: 'St_status',
      },
      section: {
        type: DataTypes.STRING,
        field: 'Section',
      },
    },
    {
      tableName: 'student',
      timestamps: false,
    }
  )
