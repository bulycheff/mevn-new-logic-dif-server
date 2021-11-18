const { Schema, model } = require('mongoose')

module.exports = model('Position', new Schema({
  name: { type: String, required: true }
}))