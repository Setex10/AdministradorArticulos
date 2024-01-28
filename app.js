//modules
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

//import routes
const indexRoute = require('./src/routes/indexRoute')
const loginRoute = require('./src/routes/loginRoute')
const inventoryRoute = require('./src/routes/inventoryRoute')
const logoutRoute = require('./src/routes/logoutRoute')
const apiRoute = require('./src/routes/apiRoute')
const registerRoute = require('./src/routes/registerRoute')
const storeRoute = require('./src/routes/storeRoute')

//settings
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'pug')
app.set('views', './public/views')
app.use(express.static('public', { extended: true }))
app.use(cookieParser())


//global middleware 
const checkCoockiesUser = (req, res, next) => {
    const avialableRoutes = ["/login", "/register"]
    const inPathCondition =  avialableRoutes.includes(req.path)
    const AuthorizationToken = req.cookies.token

    if(!AuthorizationToken && !inPathCondition) {
        res.redirect('/login')
        return
    }
    if(!AuthorizationToken && inPathCondition) {
        next()
        return
    }
    
    const validToken = jwt.verify(AuthorizationToken, process.env.TOKEN_SECRET)
    if(validToken && inPathCondition) {
        res.redirect('/')
        return
    }
    if(validToken && !inPathCondition) {
        next()
        return
    }
    if(!validToken && !inPathCondition) {
        res.redirect('/login')
        return
    }
    if(!validToken && inPathCondition) {
        next()
        return
    }
}

app.use(checkCoockiesUser)

//set routes
app.use(indexRoute)
app.use(loginRoute)
app.use(inventoryRoute)
app.use(logoutRoute)
app.use(apiRoute)
app.use(registerRoute)
app.use(storeRoute)

app.listen(3000, () =>{
    console.log('Server is running on port 3000')
})