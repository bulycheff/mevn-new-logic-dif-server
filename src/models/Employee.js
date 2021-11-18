const { Schema, model } = require('mongoose')

module.exports = model('Employee', new Schema({
  name: { type: String, required: true },
  position: { type: String, default: 'Мастер' },
  created_by: { ref: 'User', type: Schema.Types.ObjectId }
}))