const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  const Media = sequelize.define(
    'Media',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      filename: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mimetype: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      encoding: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: 'media',
      timestamps: true,
    }
  )

  Media.associate = ({ Post }) => {
    Media.belongsTo(Post, {
      foreignKey: 'postId',
    })
  }

  return Media
}
