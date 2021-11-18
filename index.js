require('dotenv').config()
const port = process.env.port
const app = require('./app')

app.listen(port, () => console.log(`Server started on address http://localhost:${ port }`))
