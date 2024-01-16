//modules
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

//import routes
const indexRoute = require('./routes/indexRoute')
const loginRoute = require('./routes/loginRoute')
const inventoryRoute = require('./routes/inventoryRoute')
const logoutRoute = require('./routes/logoutRoute')
const apiRoute = require('./routes/apiRoute')
const registerRoute = require('./routes/registerRoute')

//settings
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'pug')
app.set('views', './views')
app.use(express.static('public', { extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))


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

app.listen(3000, () =>{
    console.log('Server is running on port 3000')
})