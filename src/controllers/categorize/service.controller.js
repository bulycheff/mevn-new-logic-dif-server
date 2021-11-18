const boom = require('boom')
const { Service } = require('../../models')

module.exports = {

  getAll: async (req, res) => {
    try {
      res.status(200).json(await Service.find({}))
    } catch (e) {
      boom.boomify(e)
    }
  },

  getOneById: async ({ params: { id } }, res) => {
    try {
      res.status(200).json(await Service.findById(id))
    } catch (e) {
      boom.boomify(e)
    }
  },

  create: async ({ body: { name } }, res) => {
    try {
      const item = await Service.create({ name })
      console.log(item)
      res.status(200).json(item)
    } catch (e) {
      boom.boomify(e)
    }
  },

  delete: async ({ params: { id } }, res) => {
    try {
      const item = await Service.findByIdAndDelete(id)
      res.status(200).json(`Объект ${item._id} был удалён из базы.`)
    } catch (e) {
      boom.boomify(e)
    }
  },

  edit: async ({ body, params: { id } }, res) => {
    try {
      res.status(200).json(await Service.findByIdAndUpdate(id, { $set: body }, { new: true }))
    } catch (e) {
      boom.boomify(e)
    }
  }
}

