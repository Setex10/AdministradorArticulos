const express = require('express');
const route = express.Router();

route.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login')
})

module.exports = route;