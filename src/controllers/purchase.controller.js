const boom = require('boom')
const { Types } = require('mongoose')
const { Purchase, Day, User } = require('../models/')

module.exports = {

  async getAll(req, res) {
    try {
      let filter = {}
      if (req.query.client) {
        filter.client_id = req.query.client
        console.log(req.query.client)
      }
      console.log(filter)
      res.status(200).json(await Purchase.find(filter))
    } catch (e) {
      boom.boomify(e)
    }

  },

  async aggregatePurchases(req, res) {
    try {
      let items = await Purchase.aggregate([
        {
          $group: {
            _id: '$day_id',
            avgSum: { $sum: '$item_cost_discounted' },
            // opened: {$mi}
          }
        }
      ])


      for (let itemsKey in items) {
        const day = await Day.findById(items[itemsKey]._id)
        const user = await User.findById(day.opened_by)
        const username = user ? user.username : 'user_not_found'

        items[itemsKey].opened_at = day.opened_at
        items[itemsKey].closed_at = day.closed_at
        items[itemsKey].opened_by = username
      }

      //TODO При удалении пользователя не удалять из базы данных, а лишь присваивать статус "Удалён", так как при дальнейшем поиске поиск даёт ошибку

      console.table(items)
      res.status(200).json(items)
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