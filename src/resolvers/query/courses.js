module.exports = async (_, __, ctx) => {
  const data = await ctx.db.models.Course.findAll()

  return data
}
