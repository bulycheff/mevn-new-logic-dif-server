const router = require('express').Router()
const { roomController } = require('../../controllers')
const authMiddleware = require('../../middleware/auth.middleware')
const roleMiddleware = require('../../middleware/role.middleware')

router.get('/', authMiddleware, roomController.getAll)
router.get('/:id', authMiddleware, roomController.getOneById)
router.post('/', authMiddleware, roomController.create)
router.delete('/:id', authMiddleware, roomController.delete)
router.put('/:id', authMiddleware, roomController.edit)

module.exports = router