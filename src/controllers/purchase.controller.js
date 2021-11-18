const boom = require('boom')
const { Types } = require('mongoose')
const { Purchase } = require('../models/')

module.exports = {

  async getAll(req, res) {
    try {
      let filter = {}
      if (req.query.client) {
        filter.client_id=req.query.client
        console.log(req.query.client)
      }
      console.log(filter)
      res.status(200).json(await Purchase.find(filter))
    } catch (e) {
      boom.boomify(e)
    }

  },

  async getOneById({ params: { id } }, res) {
    try {
      res.status(200).json(await Purchase.findById(id))
    } catch (e) {
      boom.boomify(e)
    }

  },

  async create({ body, user: { id } }, res) {
    try {
      console.log(body)
      const opened_by = new Types.ObjectId(id)
      const item = await Purchase.create({ ...body, opened_by })
      console.log(item)
      res.status(200).json(item)
    } catch (e) {
      boom.boomify(e)
    }

  },

  async delete({ params: { id } }, res) {
    try {
      const item = await Purchase.findByIdAndDelete(id)
      res.status(200).json(`Объект ${item._id} был удалён из базы.`)
    } catch (e) {
      boom.boomify(e)
    }

  },

  async edit({ body, params: { id } }, res) {
    try {
      res.status(200).json(await Purchase.findByIdAndUpdate(id, { $set: body }, { new: true }))
    } catch (e) {
      boom.boomify(e)
    }

  }

}