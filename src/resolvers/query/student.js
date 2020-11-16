module.exports = async (_, { regNo }, { db }) => {
  const student = await db.models.Student.findOne({
    where: { regNo },
  })

  return student
}
