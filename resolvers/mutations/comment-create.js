const { UserInputError } = require('apollo-server-express')
const pubSub = require('../pubsub')
const { notifications } = require('../events')

const { NEW_NOTIFICATION } = notifications

module.exports = async (_, { input }, { db, user }) => {
  const { content, secret, postId } = input

  if (!content.trim().length) {
    throw new UserInputError('No comment text provided.')
  }

  const notification = {
    title: `User: '${user.id}' commented on post: '${postId}'`,
  }

  pubSub.publish(NEW_NOTIFICATION, { notification })

  return await db.models.Comment.create({
    content,
    secret,
    PostId: postId,
    UserId: user.id,
  })
}
