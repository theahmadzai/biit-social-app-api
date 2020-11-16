module.exports = async (_, __, { db }) => {
  const employees = await db.models.Employee.findAll()

  return employees
}
