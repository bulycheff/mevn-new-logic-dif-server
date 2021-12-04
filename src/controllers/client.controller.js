const boom = require('boom')
const { Day, Client } = require('../models/')
const { Types } = require('mongoose')
const { agrClientsPurchases } = require('../queries/agr')
const { Purchase } = require('../models')

module.exports = {

  async open({ user, body }, res) {
    try {

      let data = {
        opened_by: new Types.ObjectId(user.id),
        day: new Types.ObjectId(body.dayId),
        name: body.name ? body.name : ''
      }

      const client = new Client({ ...data })
      await client.save()
      await Day.findByIdAndUpdate(body.dayId, { $push: { client: client._id } })
      res.status(200).json(client)
    } catch (e) {
      boom.boomify(e)
    }
  },

  async getAll({ query: { dayId } }, res) {
    try {
      const clients = await Client.find({ day: new Types.ObjectId(dayId) })
      res.status(200).json(clients)

    } catch (e) {
      boom.boomify(e)
    }
  },

  async agrWithPurchasesByDayId(req, res) {
    try {
      const id = req.query.dayId
      const agr = agrClientsPurchases(id)
      const purchaseListByClient = await Purchase.aggregate(agr)

      res.status(200).json(purchaseListByClient)
    } catch (e) {
      boom.boomify(e)
    }
  },

  async getOne({ params: { id } }, res) {
    try {
      const client = await Client.findById(id)
      res.status(200).json(client)
    } catch (e) {
      boom.boomify(e)
    }
  },

  async close() {
    try {

    } catch (e) {
      boom.boomify(e)
    }
  },

  async update() {
    try {

    } catch (e) {
      boom.boomify(e)
    }
  },

  async delete() {
    try {

    } catch (e) {
      boom.boomify(e)
    }
  }
}