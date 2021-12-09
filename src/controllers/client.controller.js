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
      let purchaseListByClient = await Purchase.aggregate(agr)
      let dayIds = await Client.aggregate([
        {
          '$match': {
            'day': {
              '$eq': new Types.ObjectId(id)
            }
          }
        }, {
          '$project': {
            '_id': 1,
            'name': 1
          }
        }
      ])

      dayIds = dayIds.map(item => ({_id: item._id.toString(), name: item.name, program: 0, bar: 0, total: 0}))
      purchaseListByClient = purchaseListByClient.map(item => {
        item._id=item._id.toString()
        return item
      })

      let clientsTotal = purchaseListByClient.reduce((acc, cur)=> {
        const idx = dayIds.findIndex(item => item._id===cur._id)

        if(cur.payment_category==='program') {
          acc[idx]['program']+=cur.sum
        } else {
          acc[idx]['bar']+=cur.sum
        }
        acc[idx]['total']+=cur.sum

        if(!acc[idx]['name']) {
          acc[idx]['name'] = cur['name']
        }

        return acc
      }, dayIds)

      res.status(200).json(clientsTotal)
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