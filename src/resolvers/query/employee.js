module.exports = async (_, { empNo }, ctx) => {
  const data = await ctx.db.models.Employee.findOne({
    where: { empNo },
  })

  return data
}
