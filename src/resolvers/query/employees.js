module.exports = async (_, __, ctx) => {
  const data = await ctx.db.models.Employee.findAll()

  return data
}
