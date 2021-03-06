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
      secret: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      timestamps: true,
    }
  )

  Comment.associate = ({ User, Post }) => {
    Comment.belongsTo(User)

    Comment.belongsTo(Post)
  }

  return Comment
}
