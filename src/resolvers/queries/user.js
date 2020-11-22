module.exports = async (_, { username }, { db }) => {
  return await db.models.User.findOne({
    where: { username },
  })
}
