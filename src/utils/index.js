const jwt = require('jsonwebtoken')
const jwt_secret = process.env.jwt_secret

module.exports.generateAccessToken = function (id, role, username, name) {
  const payload = { id, role, username, name }
  return jwt.sign(payload, jwt_secret, { expiresIn: 60 * 60 * 24 })
}