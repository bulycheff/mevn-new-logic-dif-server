const boom = require('boom')
const { Client, Day } = require('../models')
const { Types } = require('mongoose')

module.exports = {

  async agrInfoAboutDayByDayId(req, res) {
    try {
      const id = req.params.id

      const agr = [
        {
          '$match': {
            '_id': {
              '$eq': new Types.ObjectId(id)
            }
          }
        }, {
          '$unwind': {
            'path': '$client',
            'preserveNullAndEmptyArrays': true
          }
        }, {
          '$lookup': {
            'from': 'purchases',
            'localField': 'client',
            'foreignField': 'client_id',
            'as': 'purchases'
          }
        }, {
          '$lookup': {
            'from': 'clients',
            'localField': 'client',
            'foreignField': '_id',
            'as': 'client'
          }
        }, {
          '$unwind': {
            'path': '$client',
            'preserveNullAndEmptyArrays': true
          }
        }
      ]

      let infoResp = null

      let dayInfo = await Day.aggregate(agr)
      console.log(dayInfo[0].client)

      if (dayInfo[0].client===undefined) {

        console.log(dayInfo)

        infoResp = {
          opened_at: dayInfo[0].opened_at,
          last: null,
          clients: 0,
          programs: { value: 0, sum: 0 },
          bars: { value: 0, sum: 0 },
          total: { value: 0, sum: 0 }
        }

      } else {
        dayInfo = dayInfo.map(item => {
          let { purchases, ...all } = item
          all.client.purchases = purchases
          return all
        })
        let { client, ...info } = dayInfo[0]
        info.clients = dayInfo.map(item => item.client)

        infoResp = info.clients.reduce((acc, cur) => {
          acc.clients += 1

          let count = cur.purchases.reduce((acc, cur) => {
            if (cur.payment_category === 'program') {
              acc.programs.value += 1
              acc.programs.sum += cur.item_cost_discounted
            } else if (cur.payment_category === 'bar') {
              acc.bars.value += 1
              acc.bars.sum += cur.item_cost_discounted
            }
            acc.total.value += 1
            acc.total.sum += cur.item_cost_discounted

            if ((new Date(acc.last)).valueOf() < (new Date(cur.opened_at)).valueOf()) {
              acc.last = cur.opened_at
            }

            return acc
          }, {
            last: acc.last,
            programs: { value: 0, sum: 0 },
            bars: { value: 0, sum: 0 },
            total: { value: 0, sum: 0 }
          })

          acc.bars.value += count.bars.value
          acc.programs.value += count.programs.value
          acc.total.value += count.total.value

          acc.bars.sum += count.bars.sum
          acc.programs.sum += count.programs.sum
          acc.total.sum += count.total.sum

          acc.last = count.last

          return acc
        }, {
          opened_at: info.opened_at,
          last: info.opened_at,
          clients: 0,
          programs: { value: 0, sum: 0 },
          bars: { value: 0, sum: 0 },
          total: { value: 0, sum: 0 }
        })

      }

      res.status(200).json(infoResp)

    } catch (e) {
      boom.boomify(e)
    }
  },

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
      console.log(user)
      body.closed_by = user.id
      body.closed_at = new Date()
      console.log(body)
      const day = await Day.findByIdAndUpdate(id, body, { new: true })
      res.status(200).json(day)
    } catch (e) {
      boom.boomify(e)
    }
  },

}