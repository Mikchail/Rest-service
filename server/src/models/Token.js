

const { Schema, model } = require('mongoose');
const TokenSchema = new Schema({
  refreshToken: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    dafault: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = model('Token', TokenSchema)