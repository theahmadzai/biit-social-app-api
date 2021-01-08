const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  const Post = sequelize.define(
    'Post',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      text: {
        type: DataTypes.TEXT,
      },
    },
    {
      timestamps: true,
    }
  )

  Post.associate = ({ User, Group, Media, Comment }) => {
    Post.belongsTo(User)

    Post.belongsTo(Group)

    Post.hasMany(Media)

    Post.hasMany(Comment)
  }

  return Post
}
