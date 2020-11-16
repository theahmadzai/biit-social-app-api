module.exports = async (_, __, { db }) => {
  const courses = await db.models.Course.findAll()

  return courses
}
