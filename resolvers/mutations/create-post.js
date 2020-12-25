const fs = require('fs')
const uniqid = require('uniqid')
const mime = require('mime-types')
const { UserInputError } = require('apollo-server-express')

module.exports = async (_, { input }, { db, user }) => {
  const { text, media, groupId } = input

  const postObject = { groupId, userId: user.id }

  if (!media || !media.length) {
    if (!text || !text.trim().length) {
      throw new UserInputError('No post inputs are filled.')
    }
    postObject.text = text
  }

  const post = await db.models.Post.create(postObject)

  if (!media) return post

  const files = await Promise.all(media)

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
