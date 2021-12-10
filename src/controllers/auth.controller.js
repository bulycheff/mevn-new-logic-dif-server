const boom = require('boom')
const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { use } = require('express/lib/router')
const { generateAccessToken } = require('../utils')

module.exports = {

  async register(req, res) {
    try {
      const { username, password } = req.body
      const candidate = await User.findOne({ username })

      if (candidate) {
        return res.status(400).json({
          success: false,
          message: 'Пользователь с таким username уже существует'
        })
      }

      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)

      const userRole = [(await Role.findOne({ value: 'user' })).value]
      const userData = { ...req.body, password: hashPassword, role: userRole }

      console.log(userData)

      try {
        const createdUser = new User(userData)
        // console.log(createdUser)
        await createdUser.save((err, doc) => {
          if (err) {
            console.log(err)
            res.status(400).json({ success: false, error: err })
          } else {
            res.status(200).json(createdUser)
          }
        })

      } catch (e) {
        boom.boomify(e)
      }

    } catch (e) {
      boom.boomify(e)
    }
  },

  async login(req, res) {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    if (!user) return res.status(400).json({ message: `Пользователь ${username} не найден в системе.` })

    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) return res.status(400).json({ message: `Некорректный пароль.` })

    const roleArray = await Role.find({ value: user.role }).select('value')
    // console.log(roleArray)

    const roles = roleArray.map(item => item.value)
    // console.log(roles)

    const token = generateAccessToken(user._id, user.role, user.username, user.name)

    const userSendData = {
      username: user.username,
      role: roles,
      name: user.name
    }

    res.status(200).json({ token: `Bearer ${token}`, user: userSendData })
    try {
    } catch (e) {
      boom.boomify(e)
    }

  },

  async getUserFromToken({ user }, res) {
    // console.log(user)
    try {
      const userSendData = {
        username: user.username,
        role: user.role,
        name: user.name
      }
      res.status(200).json({ user: userSendData })
    } catch (e) {
      boom.boomify(e)
    }

  },

  async getAllUsers(req, res) {
    const users = await User.find()

    let usersArr = []
    users.forEach(user => {
      usersArr.push({
        _id: user._id,
        username: user.username,
        name: user.name,
        role: user.role,
      })
    })

    res.status(200).json(usersArr)
  },

  async updateUserFields({ params: { id }, body }, res) {
    console.log(id)
    console.log(body)
    const user = await User.findByIdAndUpdate(id, { $set: body }, { new: true })
    res.status(200).json(user)
    try {
    } catch (e) {
      boom.boomify(e)
    }
  },

  async deleteById({ params: { id } }, res) {
    try {
      await User.findByIdAndDelete(id)
      res.status(200).json({ message: 'Пользователь удалён' })
    } catch (e) {
      boom.boomify(e)
    }
  },

  async createNewUser({ body }, res) {
    try {
      const user = await User.create(body)
      res.status(200).json(user)
    } catch (e) {
      boom.boomify(e)
    }
  },

  async update(req, res) {
    try {
      const item = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
      res.status(200).json(item)
    } catch (e) {
      boom.boomify(e)
    }
  },

  async delete(req, res) {
    try {
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json({ message: 'Deleted.' })
    } catch (e) {
      boom.boomify(e)
    }
  }

}