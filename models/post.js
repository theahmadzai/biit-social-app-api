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
      postableId: {
        type: DataTypes.STRING,
      },
      postableType: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  )

  Post.associate = ({ User, Group, Class, Media, Like, Comment }) => {
    Post.belongsTo(User)

    Post.belongsTo(Group, { foreignKey: 'postableId', constraints: false })

    Post.belongsTo(Class, { foreignKey: 'postableId', constraints: false })

    Post.hasMany(Media)

    Post.hasMany(Like)

    Post.hasMany(Comment)
  }

  return Post
}
