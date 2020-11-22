module.exports = async (_, { code }, { db }) => {
  return await db.models.Course.findOne({
    where: { code },
  })
}
