module.exports = sequelize => {
  const ClassTeacher = sequelize.define(
    'ClassTeacher',
    {},
    {
      timestamps: true,
    }
  )

  return ClassTeacher
}
