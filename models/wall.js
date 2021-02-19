const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  const Wall = sequelize.define(
    'Wall',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      timestamps: true,
    }
  )

  Wall.associate = ({ Post, PostPostable }) => {
    Wall.belongsToMany(Post, {
      through: {
        model: PostPostable,
        unique: false,
        scope: {
          postableType: 'WALL',
        },
      },
      foreignKey: 'postableId',
      constraints: false,
    })
  }

  return Wall
}
