const express = require('express')
const portNum = 5000
const api = require('./api')
const app = express()

app.use('/api', api)

app.listen(portNum)
module.exports = app

