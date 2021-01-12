const { UserInputError } = require('apollo-server-express')

module.exports = async (_, { id }, { user }) => {
  const [group] = await user.getGroupsOwned({ where: { id } })

  if (!group) {
    throw new UserInputError(`Invalid group or no admin rights.`)
  }

  group.destroy()

  return group
}
