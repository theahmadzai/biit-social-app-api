const fs = require('fs')
const uniqid = require('uniqid')

module.exports = async (_, { input }, { db, user }) => {
  const { text, media, group } = input

  const base64Data = media.replace(/^data:image\/svg\+xml;base64,/, '')

  const imageName = `${uniqid()}.svg`

  fs.writeFile(`uploads/${imageName}`, base64Data, 'base64', err => {
    if (err) {
      console.log(err)
      return
    }

    console.log('Done')
  })

  return await db.models.Post.create({
    text,
    media: imageName,
    groupId: group,
    userId: user.id,
  })
}
