if (
  typeof process.env.CONTAINERIZED === 'string' &&
  process.env.CONTAINERIZED.toLowerCase() === 'false'
) {
  require('dotenv').config()
}

exports.serverPort = process.env.PORT || 3000
