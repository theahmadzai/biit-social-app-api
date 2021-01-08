const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  const Like = sequelize.define(
    'Like',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    {
      timestamps: true,
    }
  )

  Like.associate = ({ User, Post }) => {
    Like.belongsTo(User)

    Like.belongsTo(Post)
  }

  return Like
}
