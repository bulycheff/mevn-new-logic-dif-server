const router = require('express').Router()
const { methodController } = require('../../controllers')
const authMiddleware = require('../../middleware/auth.middleware')
const roleMiddleware = require('../../middleware/role.middleware')

router.get('/', authMiddleware, methodController.getAll)
router.get('/:id', authMiddleware, methodController.getOneById)
router.post('/', authMiddleware, methodController.create)
router.delete('/:id', authMiddleware, methodController.delete)
router.put('/:id', authMiddleware, methodController.edit)

module.exports = router