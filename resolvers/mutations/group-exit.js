const { UserInputError } = require('apollo-server-express')

module.exports = async (_, { id }, { user }) => {
  const [group] = await user.getGroups({ where: { id } })

  if (!group) {
    throw new UserInputError(`You are not member of that group.`)
  }

  group.removeUser(user)

  return group
}
