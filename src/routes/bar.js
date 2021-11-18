const router = require('express').Router()
const { barController } = require('../controllers')
const authMiddleware = require('../middleware/auth.middleware')
const roleMiddleware = require('../middleware/role.middleware')

router.get('/', authMiddleware, barController.getAll)
router.get('/:id', authMiddleware, barController.getOneById)
router.post('/', authMiddleware, barController.create)
router.delete('/:id', authMiddleware, barController.delete)
router.put('/:id', authMiddleware, barController.edit)

module.exports = router