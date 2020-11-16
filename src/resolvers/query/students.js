module.exports = async (_, __, { db }) => {
  const students = await db.models.Student.findAll()

  return students
}
