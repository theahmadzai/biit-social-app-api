const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  const Comment = sequelize.define(
    'Comment',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'comments',
      timestamps: true,
    }
  )

  Comment.associate = ({ User, Post }) => {
    Comment.belongsTo(User, {
      foreignKey: 'userId',
    })

    Comment.belongsTo(Post, {
      foreignKey: 'postId',
    })
  }

  return Comment
}
