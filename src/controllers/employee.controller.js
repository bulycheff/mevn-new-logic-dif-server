const boom = require('boom')
const { User } = require('../models/')
const { Employee } = require('../models')
const { Types } = require('mongoose')

module.exports = {

  async getAll(req, res) {
    try {
      res.status(200).json(await Employee.find({}))
    } catch (e) {
      boom.boomify(e)
    }

  },

  async getOneById({ params: { id } }, res) {
    try {
      res.status(200).json(await Employee.findById(id))
    } catch (e) {
      boom.boomify(e)
    }

  },

  async create({ body, user: { id } }, res) {
    try {
      const created_by = new Types.ObjectId(id)
      const employee = await Employee.create({ ...body, created_by })
      console.log(employee)
      res.status(200).json(employee)
    } catch (e) {
      boom.boomify(e)
    }

  },

  async delete({ params: { id } }, res) {
    try {
      const employee = await Employee.findByIdAndDelete(id)
      res.status(200).json(`Сотрудник ${employee.name} был удалён из базы.`)
    } catch (e) {
      boom.boomify(e)
    }

  },

  async edit({ body, params: { id } }, res) {
    try {
      res.status(200).json(await Employee.findByIdAndUpdate(id, { $set: body }, { new: true }))
    } catch (e) {
      boom.boomify(e)
    }

  },

}