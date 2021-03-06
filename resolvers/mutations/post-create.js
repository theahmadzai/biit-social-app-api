const { UserInputError } = require('apollo-server-express')
const { storeFile } = require('../../utils/storage')

module.exports = async (_, { input }, { db, user }) => {
  const { text, media, postableId } = input

  if ((!media || !media.length) && (!text || !text.trim().length)) {
    throw new UserInputError('No post inputs are filled.')
  }

  const group = await db.models.Group.findOne({ where: { id: postableId } })

  const post = await group.createPost({
    text: !text || !text.trim().length ? null : text,
    UserId: user.id,
  })

  if (!media) return post

  await Promise.all(
    media.map(async file => {
      const { filename, mimetype, encoding } = await storeFile(file)
      await db.models.Media.create({
        filename,
        mimetype,
        encoding,
        PostId: post.id,
      })
    })
  )

  return post
}
