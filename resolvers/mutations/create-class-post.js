const { UserInputError } = require('apollo-server-express')
const { storeFile } = require('../../utils/storage')
const { getStudentClass } = require('../../utils')

module.exports = async (_, { input }, { db, user }) => {
  const { text, media, secret, classId } = input

  if ((!media || !media.length) && (!text || !text.trim().length)) {
    throw new UserInputError('No post inputs are filled.')
  }

  const c = await db.models.Class.findOne({
    where: classId ? { id: classId } : { name: getStudentClass(await user.getStudentProfile()) },
  })

  if (!c) {
    throw new UserInputError('Invalid class given.')
  }

  let tags = text
    .split(' ')
    .filter(tag => tag.indexOf('#') !== -1)
    .map(tag => tag.slice(tag.indexOf('#')).trim())
    .join(',')

  const post = await c.createPost({
    text: !text || !text.trim().length ? null : text,
    secret: secret ?? false,
    tags: tags.length ? tags : null,
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
