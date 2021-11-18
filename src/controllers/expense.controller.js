const { Expense } = require('../models')
const { genericController } = require('./_generic.controller')

module.exports = genericController(Expense)