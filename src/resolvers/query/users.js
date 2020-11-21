module.exports = async (_, __, { db }) => {
  const allUsers = await db.models.User.findAll()

  return allUsers
}
