const { AuthenticationError } = require('apollo-server-express')
const bcrypt = require('bcrypt')
const { sign } = require('../../utils/token')

module.exports = async (_, { username, password }, { db }) => {
  const user = await db.models.Student.findOne({
    where: { regNo: username.toUpperCase() },
  })

  if (!user) {
    throw new AuthenticationError(`User: '${username}' not found.`)
  }

  const match = await bcrypt.compare(password, bcrypt.hashSync('123', 10))

  if (!match) {
    throw new AuthenticationError('Invalid login credentials.')
  }

  const token = sign(user)

  return {
    id: user.regNo,
    name: `${user.dataValues.firstName.trim()} ${user.dataValues.lastName.trim()}`,
    email: user.email,
    token,
  }
}
