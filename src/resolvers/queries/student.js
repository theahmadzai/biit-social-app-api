module.exports = async (_, { regNo }, { db }) => {
  return await db.models.Student.findOne({
    where: { regNo },
  })
}
