const { Schema, model } = require('mongoose')

module.exports = model('Program', new Schema({
  name: { type: String, unique: true },
  service: { type: String, default: '' },
  description: { type: String, default: '' },
  cost: { type: Number }
}))