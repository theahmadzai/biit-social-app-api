const { AuthenticationError } = require('apollo-server-express')

exports.authenticated = next => (root, args, context, info) => {
  if (!context.user) {
    throw new AuthenticationError('Not authenticated.')
  }

  return next(root, args, context, info)
}

exports.authorized = (role, next) => (root, args, context, info) => {
  if (context.user.role !== role) {
    throw new AuthenticationError(`Not authorized for role: ${role} resources.`)
  }

  return next(root, args, context, info)
}
