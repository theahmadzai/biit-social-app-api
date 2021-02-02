const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  const Student = sequelize.define(
    'Student',
    {
      regNo: {
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
      sex: {
        type: DataTypes.STRING,
      },
      birthDate: {
        type: DataTypes.DATE,
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
      session: {
        type: DataTypes.STRING,
      },
      admissionDate: {
        type: DataTypes.DATE,
      },
      semester: {
        type: DataTypes.STRING,
      },
      section: {
        type: DataTypes.STRING,
      },
      program: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  )

  Student.associate = ({ User }) => {
    Student.hasOne(User, {
      foreignKey: 'username',
      targetKey: 'regNo',
      constraints: false,
    })
  }

  return Student
}
