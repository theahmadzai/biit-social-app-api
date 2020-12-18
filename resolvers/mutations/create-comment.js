module.exports = async (_, { input }, { db, user }) => {
  const { content, post } = input

  return await db.models.Comment.create({
    content,
    postId: post,
    userId: user.id,
  })
}
