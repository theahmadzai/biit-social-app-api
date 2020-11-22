const jwt = require('jsonwebtoken')
const { auth } = require('../config')

const { secret } = auth

exports.sign = user =>
  jwt.sign(
    {
      id: user.username,
    },
    secret,
    { expiresIn: '100d' }
  )

exports.verify = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, payload) => {
      if (err) return reject(err)
      return resolve(payload)
    })
  })
