const {
  SchemaDirectiveVisitor,
  AuthenticationError,
} = require('apollo-server-express')
const { defaultTypeResolver } = require('graphql')

exports.AuthenticatedDirective = class extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const resolver = field.resolve || defaultTypeResolver

    field.resolve = async (root, args, context, info) => {
      if (!context.user) {
        throw new AuthenticationError('Not authenticated.')
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
      if (context.user.role !== role) {
        throw new AuthenticationError(
          `Not authorized for role: ${role} resources.`
        )
      }

      return resolver(root, args, context, info)
    }
  }
}
