const { Schema, model } = require('mongoose')

module.exports = model('Role', new Schema({
  value: { type: String, unique: true }
}))