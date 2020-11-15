const { getUser } = require('../../utils/auth')

module.exports = async (_, __, { db, token }) => {
  const auth = await getUser(token)
  const user = await db.models.Student.findOne({
    where: { regNo: auth.id },
  })

  return user
}
