const https = require('https')
const fs = require('node:fs')

const options = {
  key: fs.readFileSync('/opt/certs/crm-k9.ru.key'),
  cert: fs.readFileSync('/opt/certs/crm-k9.ru.crt')
}

require('dotenv').config()
const port = process.env.port
const app = require('./app')

https.createServer(options, app).listen(port)