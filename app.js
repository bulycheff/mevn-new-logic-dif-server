const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const routers = require('./src/routes/')

const mongo_uri = process.env.mongo_uri

const app = express()
app.get('/api', (req, res) => {
  res.send({ message: 'Hello Express!' })
})

try {
  mongoose.connect(mongo_uri).then(() => console.log(`MongoDB successfully connected.`))
} catch (e) {
  console.log('MongoDB connection error:')
  console.log(e.message)
}

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

routers.forEach(router => app.use(`/api/v1/${router.path}`, router.routes))

module.exports = app
