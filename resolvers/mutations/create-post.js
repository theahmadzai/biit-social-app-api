module.exports = async (_, {input}, {db, user}) => {
  const {title, text, media, group} = input

  return await db.models.Post.create({
    title, 
    text, 
    media, 
    groupId: group, 
    userId: user.id
  })
}