module.exports = async (_, __, { db }) => {
  return await db.models.User.findAll()
}
