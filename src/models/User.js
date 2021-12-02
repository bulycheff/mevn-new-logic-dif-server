const { Schema, model } = require('mongoose')

module.exports = model('User', new Schema({
  username: { type: String, unique: true },
  password: { type: String },
  name: { type: String },
  role: [{ ref: 'Role', type: Schema.Types.ObjectId }]
}), 'users')