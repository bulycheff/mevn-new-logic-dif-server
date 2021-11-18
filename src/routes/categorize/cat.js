const router = require('express').Router()
const { catController } = require('../../controllers')
const authMiddleware = require('../../middleware/auth.middleware')
const roleMiddleware = require('../../middleware/role.middleware')

router.get('/', authMiddleware, catController.getAll)
router.get('/:id', authMiddleware, catController.getOneById)
router.post('/', authMiddleware, catController.create)
router.delete('/:id', authMiddleware, catController.delete)
router.put('/:id', authMiddleware, catController.edit)

module.exports = router