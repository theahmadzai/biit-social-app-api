const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

module.exports = User
