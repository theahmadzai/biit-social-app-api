const jwt = require('jsonwebtoken')
const { auth } = require('../config')

const { secret } = auth

exports.sign = ({ id, username }) =>
  jwt.sign({ id, username }, secret, { expiresIn: '100d' })

exports.verify = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, payload) => {
      if (err) return reject(err)
      return resolve(payload)
    })
  })
