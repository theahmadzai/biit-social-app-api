const jwt = require('jsonwebtoken')
const { auth } = require('../config')

const { secret } = auth

const sign = ({ id, username }) =>
  jwt.sign({ id, username }, secret, { expiresIn: '100d' })

const verify = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, payload) => {
      if (err) return reject(err)
      return resolve(payload)
    })
  })

const getUserFromToken = async authToken => {
  if (!authToken || !authToken.startsWith('Bearer ')) return null

  const token = authToken.split('Bearer ')[1].trim()

  return await verify(token).catch(() => null)
}

module.exports = {
  sign,
  verify,
  getUserFromToken,
}
