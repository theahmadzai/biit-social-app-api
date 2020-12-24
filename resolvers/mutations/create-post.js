const fs = require('fs')
const uniqid = require('uniqid')
const mime = require('mime-types')

module.exports = async (_, { input }, { db, user }) => {
  const { text, media, groupId } = input

  const files = await Promise.all(media)

  const post = await db.models.Post.create({
    text: text.trim() && text.length ? text : null,
    groupId,
    userId: user.id,
  })

  await Promise.all(
    files.map(({ mimetype, encoding, createReadStream }) => {
      const readStream = createReadStream()
      const filename = `${uniqid()}.${mime.extension(mimetype)}`
      const path = `uploads/${filename}`

      return new Promise((resolve, reject) => {
        const writeStream = fs.createWriteStream(path)

        writeStream.on('finish', async () => {
          await db.models.Media.create({
            filename,
            mimetype,
            encoding,
            postId: post.id,
          })
          resolve()
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
    })
  )

  return post
}
