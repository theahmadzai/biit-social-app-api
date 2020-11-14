const jwt = require('jsonwebtoken')

const tokenSecret = 'iy98hcbh489n38984y4h498'

exports.sign = user =>
  jwt.sign({ id: user.regNo }, tokenSecret, { expiresIn: '100d' })

exports.verify = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, tokenSecret, (err, payload) => {
      if (err) return reject(err)
      return resolve(payload)
    })
  })
