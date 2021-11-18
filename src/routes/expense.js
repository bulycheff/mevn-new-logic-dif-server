const router = require('express').Router()
const { expenseController } = require('../controllers')
const authMiddleware = require('../middleware/auth.middleware')
const roleMiddleware = require('../middleware/role.middleware')

router.get('/', authMiddleware, expenseController.getAll)
router.get('/:id', authMiddleware, expenseController.getOneById)
router.post('/', authMiddleware, expenseController.create)
router.delete('/:id', authMiddleware, expenseController.delete)
router.put('/:id', authMiddleware, expenseController.edit)

module.exports = router