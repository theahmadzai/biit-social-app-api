const pubSub = require('../pubsub')
const { notifications } = require('../events')

const { NEW_NOTIFICATION } = notifications

module.exports = (_, { title }) => {
  // store notification
  const notification = {
    title,
  }

  pubSub.publish(NEW_NOTIFICATION, { notification })

  return notification
}
