const fs = require('fs')
const uniqid = require('uniqid')
const mime = require('mime-types')

exports.storeFile = async file => {
  const { mimetype, encoding, createReadStream } = await file
  const readStream = createReadStream()
  const filename = `${uniqid()}.${mime.extension(mimetype)}`
  const path = `uploads/${filename}`

  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(path)

    writeStream.on('finish', () => {
      resolve({ filename, mimetype, encoding })
    })

    writeStream.on('error', error => {
      fs.unlink(path, () => {
        reject(error)
      })
    })

    readStream.on('error', error => {
      writeStream.destroy(error)
    })

    readStream.pipe(writeStream)
  })
}
