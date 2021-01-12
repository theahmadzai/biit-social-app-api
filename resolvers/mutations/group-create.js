const { UserInputError } = require('apollo-server-express')
const { storeFile } = require('../../utils/storage')

module.exports = async (_, { input }, { db, user }) => {
  const { name, description, image } = input

  if (!name.trim().length || !description.trim().length || !image) {
    throw new UserInputError(
      `Please provide a valid name, image and description.`
    )
  }

  const { filename } = await storeFile(image)

  const group = await db.models.Group.create({
    name: name.trim(),
    description: description.trim(),
    image: filename,
    UserId: user.id,
  })

  await group.addUser(user)

  return group
}
