const router = require('express').Router()
const { cardController } = require('../../controllers')
const authMiddleware = require('../../middleware/auth.middleware')
const roleMiddleware = require('../../middleware/role.middleware')

router.get('/', authMiddleware, cardController.getAll)
router.get('/:id', authMiddleware, cardController.getOneById)
router.post('/', authMiddleware, cardController.create)
router.delete('/:id', authMiddleware, cardController.delete)
router.put('/:id', authMiddleware, cardController.edit)

module.exports = router