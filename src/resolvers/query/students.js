module.exports = async (_, __, ctx) => {
  const data = await ctx.db.models.Student.findAll()

  return data
}
