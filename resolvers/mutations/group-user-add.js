const { UserInputError } = require('apollo-server-express')

module.exports = async (_, { input }, { user: { id }, db }) => {
  const { userId, groupId } = input

  const owner = await db.models.User.findOne({ where: { id } })

  const [group] = await owner.getGroupsOwned({ where: { id: groupId } })

  if (!group) {
    throw new UserInputError(`Invalid group or no admin rights.`)
  }

  const [user] = await group.getUsers({ where: { id: userId } })

  if (user) {
    throw new UserInputError(
      `This user is already member of group: '${group.name}'`
    )
  }

  const candidate = await db.models.User.findOne({ where: { id: userId } })

  if (!candidate) {
    throw new UserInputError(`Invalid user input.`)
  }

  group.addUser(candidate)

  return candidate
}
