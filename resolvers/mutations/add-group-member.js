const { UserInputError } = require('apollo-server-express')

module.exports = async (_, { input }, { user, db }) => {
  const { userId, groupId } = input

  const owner = await db.models.User.findOne({ where: { id: user.id } })

  const [group] = await owner.getGroupsOwned({ where: { id: groupId } })

  if (!group) {
    throw new UserInputError(`Invalid group or no admin rights.`)
  }

  const [member] = await group.getMembers({ where: { id: userId } })

  if (member) {
    throw new UserInputError(
      `This user is already member of group: '${group.name}'`
    )
  }

  const candidate = await db.models.User.findOne({ where: { id: userId } })

  if (!candidate) {
    throw new UserInputError(`Invalid user input.`)
  }

  group.addMember(candidate)

  return candidate
}
