const router = require('express').Router()
const { purchaseController } = require('../controllers')
const authMiddleware = require('../middleware/auth.middleware')
const roleMiddleware = require('../middleware/role.middleware')

router.get('/', authMiddleware, purchaseController.getAll)
router.get('/:id', authMiddleware, purchaseController.getOneById)
router.post('/', authMiddleware, purchaseController.create)
router.delete('/:id', authMiddleware, purchaseController.delete)
router.put('/:id', authMiddleware, purchaseController.edit)

module.exports = router