const { Schema, model } = require('mongoose')

module.exports = model('Bar', new Schema({
  name: { type: String, unique: true },
  description: { type: String, default: '' },
  cost: { type: Number }
}))