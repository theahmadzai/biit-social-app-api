const fs = require('fs')
const uniqid = require('uniqid')

module.exports = async (_, { input }, { db, user }) => {
  const { title, text, media, group } = input

  // console.log(media)
  const base64Data = media.replace(/^data:image\/svg\+xml;base64,/, '')
  // console.log('------------------------')
  // console.log(base64Data)

  const imageName = `uploads/${uniqid()}.svg`

  fs.writeFile(imageName, base64Data, 'base64', err => {
    if (err) {
      console.log(err)
      return
    }

    console.log('Done')
  })

  return await db.models.Post.create({
    title,
    text,
    media: imageName,
    groupId: group,
    userId: user.id,
  })
}
