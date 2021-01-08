const { UserInputError } = require('apollo-server-express')

module.exports = async (_, { id }, { db, user }) => {
  const owner = await db.models.User.findOne({ where: { id: user.id } })

  const [group] = await owner.getGroupsOwned({ where: { id } })

  if (!group) {
    throw new UserInputError(`Invalid group or no admin rights.`)
  }

  group.destroy()

  return group
}
