module.exports = async (_, { empNo }, { db }) => {
  return await db.models.Employee.findOne({
    where: { empNo },
  })
}
