const auth = require('./auth')
const day = require('./day')
const client = require('./client')
const employee = require('./employee')
const bar = require('./bar')
const program = require('./program')
const card = require('./categorize/card')
const cash = require('./categorize/cash')
const cat = require('./categorize/cat')
const method = require('./categorize/method')
const room = require('./categorize/room')
const service = require('./categorize/service')
const purchase = require('./purchase')
const expense = require('./expense')

module.exports = [
  { path: 'auth', routes: auth },
  { path: 'day', routes: day },
  { path: 'employee', routes: employee },
  { path: 'bar', routes: bar },
  { path: 'program', routes: program },
  { path: 'client', routes: client },
  { path: 'base/card', routes: card },
  { path: 'base/cash', routes: cash },
  { path: 'base/cat', routes: cat },
  { path: 'base/method', routes: method },
  { path: 'base/room', routes: room },
  { path: 'base/service', routes: service },
  { path: 'purchase', routes: purchase },
  { path: 'expense', routes: expense },
]