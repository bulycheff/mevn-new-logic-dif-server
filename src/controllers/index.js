module.exports = {
  authController: require('./auth.controller'),
  dayController: require('./day.controller'),
  employeeController: require('./employee.controller'),
  barController: require('./bar.controller'),
  programController: require('./program.controller'),
  clientController: require('./client.controller'),
  cardController: require('./categorize/card.controller'),

  cashController: require('./categorize/cash.controller'),
  catController: require('./categorize/cat.controller'),
  methodController: require('./categorize/method.controller'),
  roomController: require('./categorize/room.controller'),
  serviceController: require('./categorize/service.controller'),
  purchaseController: require('./purchase.controller'),
  expenseController: require('./expense.controller'),

  historyController: require('./history.controller'),
}