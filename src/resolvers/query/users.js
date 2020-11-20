module.exports = async (_, __, { db }) => {
  const users = await db.models.User.findAll()

  return users
}
