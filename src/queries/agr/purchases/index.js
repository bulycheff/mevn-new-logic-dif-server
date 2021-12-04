const mongoose = require('mongoose')

module.exports.agrClientsPurchases = function (id) {

  return [
    {
      '$match': {
        'day_id': {
          '$eq': new mongoose.Types.ObjectId(id)
        }
      }
    }, {
      '$lookup': {
        'from': 'clients',
        'localField': 'client_id',
        'foreignField': '_id',
        'as': 'client_id'
      }
    }, {
      '$lookup': {
        'from': 'users',
        'localField': 'opened_by',
        'foreignField': '_id',
        'as': 'opened_by'
      }
    }, {
      '$project': {
        '_id': 1,
        'day_id': 1,
        'client_id': {
          '$arrayElemAt': [
            '$client_id._id', 0
          ]
        },
        'client_name': {
          '$arrayElemAt': [
            '$client_id.name', 0
          ]
        },
        'total': '$item_cost_discounted',
        'payment_category': '$payment_category',
        'cash_box_name': '$cash_box_name',
        'purchase_date': '$opened_at'
      }
    }, {
      '$group': {
        '_id': {
          'client_id': '$client_id',
          'name': '$client_name',
          'payment_category': '$payment_category'
        },
        'sum_total': {
          '$sum': '$total'
        }
      }
    }, {
      '$project': {
        '_id': '$_id.client_id',
        'name': '$_id.name',
        'payment_category': '$_id.payment_category',
        'sum': '$sum_total'
      }
    }
  ]

}

