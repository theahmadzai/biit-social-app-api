module.exports = async (_, __, { db }) => {
  return await db.models.Student.findAll()
}
