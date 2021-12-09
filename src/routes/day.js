const router = require('express').Router()
const { dayController } = require('../controllers')
const authMiddleware = require('../middleware/auth.middleware')
const roleMiddleware = require('../middleware/role.middleware')

router.get('/info/:id', authMiddleware, dayController.agrInfoAboutDayByDayId)
router.post('/', authMiddleware, dayController.open)
router.get('/', authMiddleware, dayController.getAllOpenedWithStatus)
router.get('/:id', authMiddleware, dayController.getOne)
router.put('/:id', authMiddleware, dayController.update)

module.exports = router