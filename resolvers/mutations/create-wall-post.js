const { UserInputError } = require('apollo-server-express')
const { storeFile } = require('../../utils/storage')

module.exports = async (_, { input }, { db, user }) => {
  const { text, media } = input

  if ((!media || !media.length) && (!text || !text.trim().length)) {
    throw new UserInputError('No post inputs are filled.')
  }

  const wall = await db.models.Wall.findOne({
    where: { name: 'ALL' },
  })

  if (!wall) {
    throw new UserInputError('Invalid Wall given.')
  }

  const post = await wall.createPost({
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
