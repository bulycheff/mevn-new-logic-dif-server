const boom = require('boom')
const { Client, Day } = require('../models')
const { Types } = require('mongoose')

module.exports = {

  async open({ user }, res) {
    try {
      const { iat, exp, id, ...userFields } = user
      const day = await Day.create({ opened_by: new Types.ObjectId(id) })
      res.status(200).json(day)
    } catch (e) {
      boom.boomify(e)
    }
  },

  async getAllOpenedWithStatus({ query: { status }, user }, res) {
    try {
      let filter = {}

      if (status === 'opened') {
        filter['status'] = 'opened'
      } else if (status === 'closed') {
        filter['status'] = 'closed'
      }

      filter.opened_by = new Types.ObjectId(user.id)

      const day = await Day.find(filter)
      res.status(200).json(day)
    } catch (e) {
      boom.boomify(e)
    }
  },

  async getOne({ params: { id } }, res) {
    try {
      const day = await Day.findById(id)
      res.status(200).json(day)
    } catch (e) {
      boom.boomify(e)
    }
  },

  async update({ params: { id }, body, user }, res) {
    try {
      const { iat, exp, ...userFields } = user
      body.closed_by = userFields
      body.closed_at = new Date()
      const day = await Day.findByIdAndUpdate(id, body, { new: true })
      res.status(200).json(day)
    } catch (e) {
      boom.boomify(e)
    }
  },

}