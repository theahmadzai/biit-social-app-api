const { UserInputError } = require('apollo-server-express')

module.exports = async (_, { input }, { user }) => {
  const { userId, groupId } = input

  const [group] = await user.getGroupsOwned({ where: { id: groupId } })

  if (!group) {
    throw new UserInputError(`Invalid group or no admin rights.`)
  }

  const [member] = await group.getUsers({ where: { id: userId } })

  if (!member) {
    throw new UserInputError(
      `This user is not member of group: '${group.name}'`
    )
  }

  if (userId == user.id) {
    throw new UserInputError(`Group owner cannot be removed.`)
  }

  group.removeUser(member)

  return member
}
