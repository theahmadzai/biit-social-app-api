module.exports = sequelize => {
  const ParentChild = sequelize.define(
    'ParentChild',
    {},
    {
      timestamps: true,
    }
  )

  return ParentChild
}
