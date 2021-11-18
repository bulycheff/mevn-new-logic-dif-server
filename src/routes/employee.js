const router = require('express').Router()
const { employeeController } = require('../controllers')
const authMiddleware = require('../middleware/auth.middleware')
const roleMiddleware = require('../middleware/role.middleware')

router.get('/', authMiddleware, employeeController.getAll)
router.get('/:id', authMiddleware, employeeController.getOneById)
router.post('/', authMiddleware, employeeController.create)
router.delete('/:id', authMiddleware, employeeController.delete)
router.put('/:id', authMiddleware, employeeController.edit)

module.exports = router