const { storeFile } = require('../../utils/storage')

module.exports = async (_, { input }, { db, user }) => {
  const { name, description, image } = input

  const { filename } = await storeFile(image)

  const User = await db.models.User.findOne({ where: { id: user.id } })

  const Group = await db.models.Group.create({
    name,
    description,
    image: filename,
    userId: User.id,
  })

  await Group.addMember(User)

  return Group
}
