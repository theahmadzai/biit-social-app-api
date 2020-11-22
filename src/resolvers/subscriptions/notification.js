const pubSub = require('../pubsub')
const { notifications } = require('../events')

const { NEW_NOTIFICATION } = notifications

module.exports = {
  subscribe: () => {
    return pubSub.asyncIterator([NEW_NOTIFICATION])
  },
}
