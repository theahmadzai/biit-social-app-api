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
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
}

exports.auth = {
  secret: process.env.AUTH_SECRET || 'secret',
}
