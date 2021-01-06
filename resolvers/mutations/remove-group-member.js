const { UserInputError } = require('apollo-server-express')

module.exports = async (_, { input }, { user, db }) => {
  const { userId, groupId } = input

  const owner = await db.models.User.findOne({ where: { id: user.id } })

  const [group] = await owner.getGroupsOwned({ where: { id: groupId } })

  if (!group) {
    throw new UserInputError(`Invalid group or no admin rights.`)
  }

  const [member] = await group.getMembers({ where: { id: userId } })

  if (!member) {
    throw new UserInputError(
      `This user is not member of group: '${group.name}'`
    )
  }

  if (userId == owner.id) {
    throw new UserInputError(`Group owner cannot be removed.`)
  }

  group.removeMember(member)

  return member
}
