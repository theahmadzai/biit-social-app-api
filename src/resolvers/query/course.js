module.exports = async (_, { code }, ctx) => {
  const data = await ctx.db.models.Course.findOne({
    where: { code },
  })

  return data
}
