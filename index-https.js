const https = require('https')
const fs = require('fs')

const options = {
  key: fs.readFileSync('/opt/certs/example.com.key'),
  cert: fs.readFileSync('/opt/certs/example.com.crt')
}


require('dotenv').config()
const port = process.env.port
const app = require('./app')

https.createServer(options, app).listen(port)