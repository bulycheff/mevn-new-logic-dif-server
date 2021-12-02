const { Schema, model, Types } = require('mongoose')

module.exports = model('Day', new Schema({
  opened_by: { ref: 'User', type: Types.ObjectId },
  opened_at: { type: Date, default: Date.now },
  closed_by: { ref: 'User', type: Types.ObjectId },
  closed_at: { type: Date },
  status: { type: String, default: 'opened' },
  client: { type: Array, default: [] }
}))