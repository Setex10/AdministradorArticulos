const express = require('express');
const route = express.Router();
const bcrypt = require('bcrypt');
const {client, ObjectId} = require('../db');

route.get('/register', (req, res) => {
    res.render('login',{
        title: 'Crear Cuenta',
        msgATag: "¿Ya tienes una cuenta? ",
        msgSpanTag: "Inicia sesión",
        colorSpan: "text-emerald-500",
        colorButton: "bg-pink-500",
        colorButtonHover: "bg-pink-800",
        msgButton: "Crear",
        href: "/login",
        action: "/register",
        srcScript: "./scripts/pakage/formRegister.js",
    });
})

route.post('/register', async(req, res) => {
    if(req.body.username.trim().length == 0){
        res.status(400).json({
            message: "El usuario no puede estar vacío"
        })
        return
    }
    if(req.body.password.length < 6){
        res.status(400).json({
            message: "La contraseña debe tener al menos 6 caracteres"
        })
        return
    }
    try{
        await client.connect()
        const db = client.db("InventoryStore")
        const usersCollection = db.collection("users")
        const user = await usersCollection.findOne({name: req.body.username})
        const passwordHas = bcrypt.hash(req.body.password, 10)
        if(user){
            res.status(400).json({
                message: "El usuario ya existe"
            })
            return
        }
        const newUser = {
            name: req.body.username,
            password: await passwordHas
        }
        await usersCollection.insertOne(newUser)
        res.status(200).json({
            message: "Usuario creado"
        })
        client.close()
    }
    catch(error){
        res.status(500).json(error)
    }
})



module.exports = route;