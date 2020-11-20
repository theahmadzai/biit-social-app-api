const { getUser } = require('../../utils/auth')

module.exports = async (_, __, { db, authToken }) => {
  const auth = await getUser(authToken)
  const user = await db.models.User.findOne({
    where: { username: auth.id },
  })

  return user
}
