const { Schema, model } = require('mongoose')

module.exports = model('Client', new Schema({
  name: { type: String, default: '' },
  day: { ref: 'Day', type: Schema.Types.ObjectId, required: true },
  status: { type: String, default: 'opened' },
  opened_by: { ref: 'User', type: Schema.Types.ObjectId },
  opened_at: { type: Date, default: Date.now },
  sale_bar: [{ ref: 'Bar', type: Schema.Types.ObjectId }],
  sale_program: [{ ref: 'Program', type: Schema.Types.ObjectId }],
  closed_by: { ref: 'User', type: Schema.Types.ObjectId },
  closed_at: { type: Date }
}))