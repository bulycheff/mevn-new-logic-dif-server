const router = require('express').Router()
const { cashController } = require('../../controllers')
const authMiddleware = require('../../middleware/auth.middleware')
const roleMiddleware = require('../../middleware/role.middleware')

router.get('/', authMiddleware, cashController.getAll)
router.get('/:id', authMiddleware, cashController.getOneById)
router.post('/', authMiddleware, cashController.create)
router.delete('/:id', authMiddleware, cashController.delete)
router.put('/:id', authMiddleware, cashController.edit)

module.exports = router