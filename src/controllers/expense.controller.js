const { Expense } = require('../models')
const { genericController } = require('./_generic.controller')

const expenseController = genericController(Expense)








module.exports = expenseController