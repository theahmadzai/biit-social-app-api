const { UserInputError } = require('apollo-server-express')
const { storeFile } = require('../../utils/storage')

module.exports = async (_, { input }, { db, user }) => {
  const { text, media, postableId } = input

  if ((!media || !media.length) && (!text || !text.trim().length)) {
    throw new UserInputError('No post inputs are filled.')
  }

  const Post = await db.models.Post.create({
    text: !text || !text.trim().length ? null : text,
    UserId: user.id,
    postableType: 'group',
    postableId,
  })

  if (!media) return Post

  await Promise.all(
    media.map(async file => {
      const { filename, mimetype, encoding } = await storeFile(file)
      await db.models.Media.create({
        filename,
        mimetype,
        encoding,
        PostId: Post.id,
      })
    })
  )

  return Post
}
