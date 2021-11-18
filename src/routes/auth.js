const router = require('express').Router()
const { authController } = require('../controllers')
const authMiddleware = require('../middleware/auth.middleware')
const roleMiddleware = require('../middleware/role.middleware')

router.post('/register', authMiddleware, roleMiddleware(['admin']), authController.register)
router.post('/login', authController.login)
router.get('/status', authMiddleware, authController.getUserFromToken)
router.get('/user', authMiddleware, roleMiddleware(['admin', 'user']), authController.getAllUsers)
router.put('/user/:id', authMiddleware, roleMiddleware(['admin', 'director', 'manager']), authController.updateUserFields)
router.delete('/user/:id', authMiddleware, roleMiddleware(['admin', 'director', 'manager']), authController.deleteById)
router.post('/user', authMiddleware, roleMiddleware(['admin']), authController.createNewUser)

module.exports = router