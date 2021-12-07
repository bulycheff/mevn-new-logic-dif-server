const boom = require('boom')
const { Types } = require('mongoose')
const { Purchase, Day, User } = require('../models/')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')


module.exports = {
  daysHistory: async (req, res) => {

    const agg = [
      {
        '$match': {
          'opened_at': {
            '$gte': new Date((new Date(req.query.from)).setHours(0, 0, 0, 0)),
            '$lte': new Date((new Date(req.query.to)).setHours(23, 59, 59, 0))
          }
        }
      }, {
        '$lookup': {
          'from': 'purchases',
          'localField': '_id',
          'foreignField': 'day_id',
          'as': 'purchases'
        }
      }, {
        '$lookup': {
          'from': 'users',
          'localField': 'opened_by',
          'foreignField': '_id',
          'as': 'user'
        }
      }, {
        '$project': {
          '_id': '$_id',
          'opened_by': {
            '$arrayElemAt': [
              '$user', 0
            ]
          },
          'closed_by': '$closed_by',
          'status': '$status',
          'client': '$client',
          'opened_at': '$opened_at',
          'closed_at': '$closed_at',
          'purchases': '$purchases'
        }
      }, {
        '$project': {
          'opened_by._id': 1,
          'opened_by.username': 1,
          'closed_by': 1,
          'status': 1,
          'client': 1,
          'opened_at': 1,
          'closed_at': 1,
          'purchases': 1
        }
      }
    ]

    try {
      const response = await Day.aggregate(agg)
      res.status(200).json(response)
    } catch (e) {
      boom.boomify(e)
    }
  },

  toObjectId: async (req, res) => {
    try {
      const agg = [
        {
          '$match': {
            'opened_at': {
              '$gte': new Date('Thu, 31 Dec 2020 19:00:00 GMT'),
              '$lte': new Date('Fri, 31 Dec 2021 18:59:59 GMT')
            }
          }
        }, {
          '$set': {
            'opened_by': {
              '$toObjectId': '$opened_by'
            }
          }
        }
      ]

      MongoClient.connect(
        'mongodb+srv://user:fUBb0rD9@cluster0.zal5i.mongodb.net/mevn-new-logic?authSource=admin&replicaSet=atlas-5yfhy2-shard-0&readPreference=primary&appname=MongoDB+Compass&ssl=true',
        { useNewUrlParser: true, useUnifiedTopology: true },
        function (connectErr, client) {
          assert.equal(null, connectErr)
          const coll = client.db('mevn-new-logic').collection('days')
          coll.aggregate(agg, (cmdErr, result) => {
            assert.equal(null, cmdErr)
          })
          client.close()
        })
      res.status(200).json('ok')
    } catch (e) {
      boom.boomify(e)
    }
  }
}
