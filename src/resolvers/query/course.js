module.exports = async (_, { code }, { db }) => {
  const course = await db.models.Course.findOne({
    where: { code },
  })

  return course
}
