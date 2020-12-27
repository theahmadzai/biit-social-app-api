const { defaultTypeResolver } = require('graphql')
const {
  SchemaDirectiveVisitor,
  AuthenticationError,
} = require('apollo-server-express')

exports.AuthenticatedDirective = class extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const resolver = field.resolve || defaultTypeResolver

    field.resolve = async (root, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated.')
      }

      const user = await context.db.models.User.findOne({
        where: { id: context.user.id },
      })

      if (!user) {
        throw new AuthenticationError(`This user doesn't exist.`)
      }

      return resolver(root, args, context, info)
    }
  }
}

exports.AuthorizedDirective = class extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const resolver = field.resolve || defaultTypeResolver
    const { role } = this.args

    field.resolve = async (root, args, context, info) => {
      const user = await context.db.models.User.findOne({
        where: { id: context.user.id },
      })

      if (!user) {
        throw new AuthenticationError(`This user doesn't exist.`)
      }

      if (user.role !== role) {
        throw new AuthenticationError(
          `Not authorized for role: ${role} resources.`
        )
      }

      return resolver(root, args, context, info)
    }
  }
}
