const { model, Schema } = require('mongoose')

module.exports.Cat = model('Cat', new Schema({ name: { type: String } }))
module.exports.Cash = model('Cash', new Schema({ name: { type: String } }))
module.exports.Method = model('Method', new Schema({ name: { type: String } }))
module.exports.Card = model('Card', new Schema({ name: { type: String } }))
module.exports.Room = model('Room', new Schema({ name: { type: String } }))
module.exports.Service = model('Service', new Schema({ name: { type: String } }))
