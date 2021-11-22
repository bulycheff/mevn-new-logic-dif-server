const https = require('https')
const fs = require('fs')

const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/crm-k9.ru/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/crm-k9.ru/fullchain.pem')
}

require('dotenv').config()
const port = process.env.port
const app = require('./app')

https.createServer(options, app).listen(port)