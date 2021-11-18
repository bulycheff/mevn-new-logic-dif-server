const router = require('express').Router()
const authMiddleware = require('../../../middleware/auth.middleware')
const names = require('../names')
const {
  cardController,
  catController,
  methodController,
  cashController,
  roomController,
  serviceController
} = require('../controller/generic.cat.controller')

const genericRouter = (controller) => {
  router.get('/', authMiddleware, controller.getAll)
  router.get('/:id', authMiddleware, controller.getOneById)
  router.post('/', authMiddleware, controller.create)
  router.delete('/:id', authMiddleware, controller.delete)
  router.put('/:id', authMiddleware, controller.edit)
  return router
}

const cardRouter = genericRouter(cardController)
const catRouter = genericRouter(catController)
const methodRouter = genericRouter(methodController)
const cashRouter = genericRouter(cashController)
const roomRouter = genericRouter(roomController)
const serviceRouter = genericRouter(serviceController)

module.exports = cardRouter
module.exports = catRouter
module.exports = methodRouter
module.exports = cashRouter
module.exports = roomRouter
module.exports = serviceRouter



