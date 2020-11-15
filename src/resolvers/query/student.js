module.exports = async (_, { regNo }, ctx) => {
  const data = await ctx.db.models.Student.findOne({
    where: { regNo },
  })

  return data
}
