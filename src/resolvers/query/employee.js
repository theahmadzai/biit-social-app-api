module.exports = async (_, { empNo }, { db }) => {
  const employee = await db.models.Employee.findOne({
    where: { empNo },
  })

  return employee
}
