const jwt_secret = process.env.jwt_secret
const jwt = require('jsonwebtoken')
const { Role } = require("../models")
const { Types } = require('mongoose')

module.exports = (roles) => {

  return async function (req, res, next) {
    if (req.method === 'OPTIONS') {
      next()
    }

    try {
      const token = req.headers.authorization.split(' ')[1]
      if (!token) {
        return res.status(403).json({ message: 'Пользователь не авторизован' })
      }

      const allRolesFromDb = await Role.find()
      const rolesArr = allRolesFromDb.filter(role => roles.includes(role.value)).map(role => role._id.toString())

      const decodedData = jwt.verify(token, jwt_secret)
      const userRoles = decodedData.role

      let hasRole = false

      userRoles.forEach(role => {
        if (roles.includes(role)) {
          hasRole = true
        }
      })

      if (!hasRole) {
        return res.status(403).json('Нет прав на просмотр')
      }

      next()
    } catch (e) {
      console.log(e.message)
    }
  }
}
