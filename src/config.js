if (
  typeof process.env.CONTAINERIZED === 'string' &&
  process.env.CONTAINERIZED.toLowerCase() === 'false'
) {
  require('dotenv').config()
}

exports.server = {
  port: process.env.PORT || 3000,
}

exports.database = {
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  name: process.env.DB_NAME,
  mongoUrl: process.env.MONGO_URL,
}

exports.auth = {
  secret: process.env.AUTH_SECRET,
}
