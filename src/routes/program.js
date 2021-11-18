const router = require('express').Router()
const { programController } = require('../controllers')
const authMiddleware = require('../middleware/auth.middleware')
const roleMiddleware = require('../middleware/role.middleware')

router.get('/', authMiddleware, programController.getAll)
router.get('/:id', authMiddleware, programController.getOneById)
router.post('/', authMiddleware, programController.create)
router.delete('/:id', authMiddleware, programController.delete)
router.put('/:id', authMiddleware, programController.edit)

module.exports = router