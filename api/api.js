//endpoint with url "api/x" handles processing input range with value = x
//supposedly, output data (i.e. offices in range) should be sent back to
//main page, for it (and not the api page) to display them. I am not sure of this yet...

//so far, I am NOT using a different project for the api (i.e. create another node app)
//because I am not using next, at least just for now
const express = require('express')
const Router = express.Router()

Router.get('/:resource', (req, res) => {
    const resource = req.params.resource
    res.json({
        data : resource,
        confirmation : 'success'
    })
})

module.exports = Router