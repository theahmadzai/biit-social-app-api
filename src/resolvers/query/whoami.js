const { getUser } = require('../../utils/auth')

module.exports = async (_, __, { db, authToken }) => {
  const auth = await getUser(authToken)
  const user = await db.models.Student.findOne({
    where: { regNo: auth.id },
  })

  return user
}
