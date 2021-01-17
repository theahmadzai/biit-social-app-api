const { UserInputError } = require('apollo-server-express')
const rxf = require('read-excel-file/node')
const { parseDatesheet, parseTimetable } = require('../../utils/parser')

module.exports = async (_, { input: { type, file } }, { db }) => {
  const { createReadStream } = await file

  try {
    const data = await rxf(createReadStream())

    if (type === 'DATESHEET') {
      const datesheet = parseDatesheet(data)
      await db.models.Datesheet.bulkCreate(datesheet)
    } else if (type === 'TIMETABLE') {
      const timetable = parseTimetable(data)
      db.models.Timetable.bulkCreate(timetable)
    } else {
      throw new UserInputError(`Invalid file type.`)
    }
  } catch (err) {
    throw new UserInputError('Invalid file or format.')
  }

  return `${type}: Posted!`
}
