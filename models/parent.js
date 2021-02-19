const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  const Parent = sequelize.define(
    'Parent',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cnic: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
    }
  )

  Parent.associate = ({ User, ParentChild }) => {
    Parent.belongsToMany(User, {
      through: ParentChild,
    })
  }

  return Parent
}
