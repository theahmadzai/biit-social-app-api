const { AuthenticationError } = require('apollo-server-express')
const bcrypt = require('bcrypt')
const { sign } = require('../../utils/token')

module.exports = async (_, { input: { username, password } }, { db }) => {
  const user = await db.models.User.findOne({
    where: { username: username.toUpperCase() },
  })

  if (!user) {
    throw new AuthenticationError(`User: '${username}' not found.`)
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw new AuthenticationError('Invalid login credentials.')
  }

  const token = sign(user)

  return {
    token,
    user,
  }
}
