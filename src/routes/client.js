const router = require('express').Router()
const { clientController } = require('../controllers')
const authMiddleware = require('../middleware/auth.middleware')
const roleMiddleware = require('../middleware/role.middleware')

router.get('/agr', authMiddleware, clientController.agrWithPurchasesByDayId)
router.post('/', authMiddleware, clientController.open)
router.put('/:id', authMiddleware, clientController.close)
router.get('/:id', authMiddleware, clientController.getOne)
router.get('/', authMiddleware, clientController.getAll)
router.delete('/:id', authMiddleware, clientController.delete)

module.exports = router