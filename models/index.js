const { Sequelize } = require('sequelize')
const { db } = require('../config')

const sequelize = new Sequelize(db.url)

const models = {}

models.Student = require('./student')(sequelize)
models.Employee = require('./employee')(sequelize)
models.User = require('./user')(sequelize)
models.Group = require('./group')(sequelize)
models.GroupUser = require('./group-user')(sequelize)
models.Class = require('./class')(sequelize)
models.Post = require('./post')(sequelize)
models.Like = require('./like')(sequelize)
models.Comment = require('./comment')(sequelize)
models.Media = require('./media')(sequelize)
models.Course = require('./course')(sequelize)
models.Timetable = require('./timetable')(sequelize)
models.Datesheet = require('./datesheet')(sequelize)

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

sequelize
  // .sync({ force: true })
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

module.exports = sequelize
