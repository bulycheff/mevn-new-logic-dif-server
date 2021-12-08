const { Expense } = require('../models')
const { Types } = require('mongoose')
const boom = require('boom')

const expenseController = {

  async getAll(req, res) {
    try {
      const day_id = new Types.ObjectId(req.query.day_id)
      res.status(200).json(await Expense.find({day_id}))
    } catch (e) {
      boom.boomify(e)
    }

  },

  async getOneById({ params: { id } }, res) {
    try {
      res.status(200).json(await Expense.findById(id))
    } catch (e) {
      boom.boomify(e)
    }

  },

  async create({ body, user: { id } }, res) {
    try {
      const opened_by = new Types.ObjectId(id)
      console.log(body)
      const item = await Expense.create({ ...body, opened_by })
      res.status(200).json(item)
    } catch (e) {
      boom.boomify(e)
    }

  },

  async delete({ params: { id } }, res) {
    try {
      const item = await Expense.findByIdAndDelete(id)
      res.status(200).json(`Объект ${item._id} был удалён из базы.`)
    } catch (e) {
      boom.boomify(e)
    }

  },

  async edit({ body, params: { id } }, res) {
    try {
      res.status(200).json(await Expense.findByIdAndUpdate(id, { $set: body }, { new: true }))
    } catch (e) {
      boom.boomify(e)
    }

  }

}


module.exports = expenseController