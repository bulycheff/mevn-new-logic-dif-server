const boom = require('boom')
const { Types } = require('mongoose')

module.exports.genericController = model => ({

  async getAll(req, res) {
    try {
      res.status(200).json(await model.find({}))
    } catch (e) {
      boom.boomify(e)
    }

  },

  async getOneById({ params: { id } }, res) {
    try {
      res.status(200).json(await model.findById(id))
    } catch (e) {
      boom.boomify(e)
    }

  },

  async create({ body, user: { id } }, res) {
    try {
      const opened_by = new Types.ObjectId(id)
      const item = await model.create({ ...body, opened_by })
      res.status(200).json(item)
    } catch (e) {
      boom.boomify(e)
    }

  },

  async delete({ params: { id } }, res) {
    try {
      const item = await model.findByIdAndDelete(id)
      res.status(200).json(`Объект ${item._id} был удалён из базы.`)
    } catch (e) {
      boom.boomify(e)
    }

  },

  async edit({ body, params: { id } }, res) {
    try {
      res.status(200).json(await model.findByIdAndUpdate(id, { $set: body }, { new: true }))
    } catch (e) {
      boom.boomify(e)
    }

  }

})