const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  const PostPostable = sequelize.define(
    'PostPostable',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      postId: {
        type: DataTypes.INTEGER,
        unique: 'tt_unique_constraint',
      },
      postableId: {
        type: DataTypes.STRING,
        unique: 'tt_unique_constraint',
        references: null,
      },
      postableType: {
        type: DataTypes.STRING,
        unique: 'tt_unique_constraint',
      },
    },
    {
      timestamps: true,
    }
  )

  PostPostable.associate = () => {}

  return PostPostable
}
