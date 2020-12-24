module.exports = async (_, { input }, { db, user }) => {
  const { content, postId } = input

  return await db.models.Comment.create({
    content,
    postId,
    userId: user.id,
  })
}
