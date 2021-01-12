const { UserInputError } = require('apollo-server-express')
const { Group, User, Like } = require('../../models').models

module.exports = async (_, { id }, { user, db }) => {
  const post = await db.models.Post.findOne({
    where: { id },
    include: [
      {
        model: Group,
        include: [
          {
            model: User,
            where: { id: user.id },
          },
        ],
      },
      {
        model: Like,
      },
    ],
  })

  if (!post) {
    throw new UserInputError('Invalid post.')
  }

  const [liked] = post.Likes.filter(({ UserId }) => UserId === user.id)

  if (liked) {
    await liked.destroy()
  } else {
    await db.models.Like.create({
      UserId: user.id,
      PostId: id,
    })
  }

  return post.getLikes()
}
