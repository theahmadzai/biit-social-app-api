if (
  typeof process.env.CONTAINERIZED === 'string' &&
  process.env.CONTAINERIZED.toLowerCase() === 'false'
) {
  require('dotenv').config()
}

exports.app = {
  port: process.env.PORT || 3000,
}

exports.db = {
  url: process.env.DATABASE_URL || null,
}

exports.auth = {
  secret: process.env.AUTH_SECRET || 'secret',
}
