const { Sequelize } = require('sequelize')
const mongodb = require('mongoose')
const { database } = require('./config')

const { dialect, host, port, user, password, name, mongoUrl } = database

const sequelize = new Sequelize(name, user, password, {
  host,
  port,
  dialect,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
})

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

require('./models/course')(sequelize)
require('./models/employee')(sequelize)
require('./models/student')(sequelize)
require('./models/user')(sequelize)

const mongoose = mongodb.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.then(
  () => {
    console.log(`Connected to ${mongoUrl}`)
  },
  () => {
    console.log('Failed to connect to mongodb.')
  }
)

module.exports = {
  sequelize,
  mongoose,
}
