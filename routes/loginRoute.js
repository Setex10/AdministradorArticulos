const express = require('express');
const bcrypt = require('bcrypt');
const route = express.Router();
const {client} = require('../db');
require('dotenv').config();
const jwt = require('jsonwebtoken')

route.get('/login', (req, res) => {
    res.status(200).render('login', {
        title: 'Iniciar Sesión',
        msgATag: "¿Quieres crear una cuenta? ",
        msgSpanTag: "Registrate",
        colorSpan: "text-pink-500",
        colorButton: "bg-emerald-500",
        colorButtonHover: " bg-emerald-800",
        msgButton: "Enviar",
        href: "/register",
        action: "/login",
        srcScript: "./scripts/package/formLogin.js",
    });
})

route.post('/login', async(req, res) => {
    await client.connect()
    const db = client.db("InventoryStore")
    const usersCollection = db.collection("users")
    const user = await usersCollection.findOne({
        name: req.body.username
    })
    if(!user){
        res.status(401).send({
            message: "Usuario o contraseña incorrectos"
        })
        return
    }
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if(!validPassword){
        res.status(401).send({
            message: "Usuario o contraseña incorrectos"
        })
        return
    }
    res.cookie("token", jwt.sign({id: user._id, username: user.name}, 
        process.env.TOKEN_SECRET, {
            algorithm: "HS256",
        }))
    res.status(200).json({
        message: "Usuario autenticado"
    })
    client.close()
})

module.exports = route;