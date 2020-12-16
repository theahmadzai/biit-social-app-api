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
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      groupId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'posts',
      timestamps: true,
    }
  )

  Post.associate = ({ User, Group, Media, Comment }) => {
    Post.belongsTo(User, {
      foreignKey: 'userId',
    })

    Post.belongsTo(Group, {
      foreignKey: 'groupId',
    })

    Post.hasMany(Media, {
      foreignKey: 'postId',
    })

    Post.hasMany(Comment, {
      foreignKey: 'postId',
      onDelete: 'NO ACTION',
    })
  }

  return Post
}
