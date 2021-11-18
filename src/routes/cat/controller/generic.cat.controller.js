const boom = require('boom')
const { Types } = require('mongoose')
const {
  Cat,
  Cash,
  Card,
  Method,
  Room,
  Service
} = require('../model/generic.cat.model')

const createController = (model) => ({

  getAll: async (req, res) => {
    try {
      res.status(200).json(await model.find({}))
    } catch (e) {
      boom.boomify(e)
    }
  },

  getOneById: async ({ params: { id } }, res) => {
    try {
      res.status(200).json(await model.findById(id))
    } catch (e) {
      boom.boomify(e)
    }
  },

  create: async ({ body: { name } }, res) => {
    try {
      const item = await model.create({ name })
      console.log(item)
      res.status(200).json(item)
    } catch (e) {
      boom.boomify(e)
    }
  },

  delete: async ({ params: { id } }, res) => {
    try {
      const item = await model.findByIdAndDelete(id)
      res.status(200).json(`Объект ${item._id} был удалён из базы.`)
    } catch (e) {
      boom.boomify(e)
    }
  },

  edit: async ({ body, params: { id } }, res) => {
    try {
      res.status(200).json(await model.findByIdAndUpdate(id, { $set: body }, { new: true }))
    } catch (e) {
      boom.boomify(e)
    }
  }

})

module.exports.catController = createController(Cat)
module.exports.cashController = createController(Cash)
module.exports.cardController = createController(Card)
module.exports.methodController = createController(Method)
module.exports.roomController = createController(Room)
module.exports.serviceController = createController(Service)