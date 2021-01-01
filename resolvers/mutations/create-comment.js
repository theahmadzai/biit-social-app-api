const { UserInputError } = require('apollo-server-express')

module.exports = async (_, { input }, { db, user }) => {
  const { content, postId } = input

  if (!content.trim().length) {
    throw new UserInputError('Write something before sending.')
  }

  return await db.models.Comment.create({
    content,
    postId,
    userId: user.id,
  })
}
