const { AuthenticationError } = require('apollo-server-express')
const { verify } = require('./token')

exports.getUser = async bearerToken => {
  if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
    throw new AuthenticationError('Invalid token type.')
  }

  const token = bearerToken.split('Bearer ')[1].trim()

  let payload

  try {
    payload = await verify(token)
  } catch (err) {
    throw new AuthenticationError('Invalid token.')
  }

  return payload
}
