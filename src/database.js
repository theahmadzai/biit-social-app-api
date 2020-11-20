const { Sequelize } = require('sequelize')
const {
  database: { dialect, host, port, user, password, name },
} = require('./config')

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

module.exports = sequelize
