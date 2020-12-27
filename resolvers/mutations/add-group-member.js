const { UserInputError } = require('apollo-server-express')

module.exports = async (_, { input }, { user, db }) => {
  const { username, groupId } = input

  const owner = await db.models.User.findOne({ where: { id: user.id } })

  const group = await owner.getGroupsOwned({
    where: { id: groupId },
  })

  if (!group.length) {
    throw new UserInputError('Adding member to an invalid group.')
  }

  const candidate = await db.models.User.findOne({ where: { username } })

  if (!candidate) {
    throw new UserInputError(
      `User with username: '${username}' does not exist.`
    )
  }

  const members = await group[0].getMembers({ where: { id: candidate.id } })

  if (members.length) {
    throw new UserInputError(
      `User: '${username}' already exists in group: '${group[0].name}'`
    )
  }

  group[0].addMember(candidate)

  return candidate
}
