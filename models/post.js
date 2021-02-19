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
      secret: {
        type: DataTypes.BOOLEAN,
      },
      tags: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  )

  Post.associate = ({ User, Group, Class, Wall, PostPostable, Media, Like, Comment }) => {
    Post.belongsTo(User)

    // Post.belongsTo(Group, { foreignKey: 'postableId', constraints: false })

    // Post.belongsTo(Class, { foreignKey: 'postableId', constraints: false })

    Post.hasMany(Media)

    Post.hasMany(Like)

    Post.hasMany(Comment)

    Post.belongsToMany(Group, {
      through: {
        model: PostPostable,
        unique: false,
      },
      foreignKey: 'postId',
      constraints: false,
    })

    Post.belongsToMany(Class, {
      through: {
        model: PostPostable,
        unique: false,
      },
      foreignKey: 'postId',
      constraints: false,
    })

    Post.belongsToMany(Wall, {
      through: {
        model: PostPostable,
        unique: false,
      },
      foreignKey: 'postId',
      constraints: false,
    })
  }

  Post.getTaggables = async function (options) {
    const classes = await this.getClasses(options)
    const groups = await this.getGroups(options)
    const walls = await this.getWalls(options)

    return classes.concat(groups).concat(walls)
  }

  return Post
}
