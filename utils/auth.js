// const { AuthenticationError } = require('apollo-server-express')
const { verify } = require('./token')

exports.getUserFromToken = async authToken => {
  if (!authToken || !authToken.startsWith('Bearer ')) {
    // throw new AuthenticationError('Invalid token type.')
    return null
  }

  const token = authToken.split('Bearer ')[1].trim()

  let payload

  try {
    payload = await verify(token)
  } catch (err) {
    // throw new AuthenticationError('Invalid token.')
    return null
  }

  return payload
}
