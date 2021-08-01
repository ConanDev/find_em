const express = require('express')
const portNum = 5000
const api = require('./api')
const app = express()

app.use('/api', api)
app.post('/abc', (req, res) => {
    alert('hello world!')
})
app.listen(portNum)
module.exports = app

