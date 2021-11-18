const router = require('express').Router()
const { serviceController } = require('../../controllers')
const authMiddleware = require('../../middleware/auth.middleware')
const roleMiddleware = require('../../middleware/role.middleware')

router.get('/', authMiddleware, serviceController.getAll)
router.get('/:id', authMiddleware, serviceController.getOneById)
router.post('/', authMiddleware, serviceController.create)
router.delete('/:id', authMiddleware, serviceController.delete)
router.put('/:id', authMiddleware, serviceController.edit)

module.exports = router