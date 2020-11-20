module.exports = async (_, { username }, { db }) => {
  const user = await db.models.User.findOne({
    where: { username },
  })

  return user
}
