const { UserInputError } = require('apollo-server-express')

module.exports = async (_, { input }, { user, db }) => {
  const { username, groupId } = input

  const owner = await db.models.User.findOne({ where: { id: user.id } })

  const group = await owner.getGroupsOwned({ where: { id: groupId } })

  if (!group.length) {
    throw new UserInputError(`Invalid group or no admin rights.`)
  }

  const candidate = await db.models.User.findOne({ where: { username } })

  if (!candidate) {
    throw new UserInputError(
      `User with username: '${username}' does not exist.`
    )
  }

  if (candidate.id === owner.id) {
    throw new UserInputError(`You cannot remove the owner of the group.`)
  }

  const members = await group[0].getMembers({ where: { id: candidate.id } })

  if (!members.length) {
    throw new UserInputError(
      `User: '${username}' does not exists in group: '${group[0].name}'`
    )
  }

  group[0].removeMember(candidate)

  return candidate
}
