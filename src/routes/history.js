const router = require('express').Router()
const { historyController } = require('../controllers')
const authMiddleware = require('../middleware/auth.middleware')
const roleMiddleware = require('../middleware/role.middleware')

router.get('/days', authMiddleware, historyController.daysHistory)
router.get('/to-obj-id', authMiddleware, historyController.toObjectId)

module.exports = router