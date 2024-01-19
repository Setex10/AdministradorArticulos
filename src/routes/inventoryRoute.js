const express = require('express')
const route = express.Router()


route.get('/inventory', async(req, res) => {
    res.render('inventory')
})


module.exports = route