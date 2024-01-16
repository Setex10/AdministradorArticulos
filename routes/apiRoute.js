const express = require('express')
const route = express.Router()
const jwt = require('jsonwebtoken')
require('dotenv').config()
const {client, ObjectId} = require('../db')


route.get('/api/items/:name', async(req, res) => {
    try {
        const {params} = req
        await client.connect()
        const db = client.db("InventoryStore")
        const itemsCollection = db.collection("items")
        const enterpriseCollection = db.collection("enterprise")
        const userId = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET).id
        const projection = {
            "id_user": 0
        }
        const itemsList = await itemsCollection.find({
            id_user: new ObjectId(userId),
            ...params
        }, {projection}).toArray()

        const enterpriseList = await enterpriseCollection.find({
            id_user: new ObjectId(userId)
        }, {projection}).toArray()

        if(itemsList.length == 0){
            res.status(200).json([])
            client.close()
            return
        }
        itemsList.forEach(item => {
            const enterprise = enterpriseList.find(enterprise => enterprise._id.toString() === item.enterprise_id.toString())
            item.enterprise = enterprise.name || "No se encontró"
        })
        res.status(200).json(itemsList)
    }
    catch(error){
        res.status(500).json(error)
    } finally{
        await client.close()
    }
})

route.get('/api/items', async (req, res) => {
    const validParams = ["name", "enterprise_name", 
                        "unit", "quantity", "price", "product_key"]
    const params = req.query
    Object.keys(params).forEach(key => {
        if(!validParams.includes(key)) {
            delete params[key]
        }
        if(params[key] == ""){
            delete params[key]
        }
    })
    try{
        await client.connect()
        const db = client.db("InventoryStore")
        const itemsCollection = db.collection("items")
        const id_user = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET).id
        const projection = {
            "id_user": 0
        }
        const itemsList = await itemsCollection.find({
            id_user: new ObjectId(id_user),
            ...params
        }, {projection}).toArray()

        if(itemsList.length == 0){
            res.status(200).json([])
            return
        } else{            
            res.status(200).json(itemsList)
        }
    } catch(error){
        res.status(500).json({
            message: error.message
        })
    } finally {
        await client.close()
    }
})

route.post('/api/item', async (req, res) => {
    const {body} = req
    Object.keys(body).forEach(key => {
        if(body[key] === '') {
            res.json(400, {
                message: "No se puede dejar campos vacíos"
            })
        }
    })
    
    try{
        await client.connect()
        const db = client.db("InventoryStore")
        const itemsCollection = db.collection("items")
        const id_user = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET).id
        const result = await itemsCollection.insertOne({...body, 
            id_user: new ObjectId(id_user)})
        res.status(200).json(result)
    } catch(error){
        res.status(500).json(error)
    } finally {
        await client.close()
    }
})

route.delete('/api/item', async (req, res) => {
    try{
        console.log("DELETE /api/item/:id")
        await client.connect()
        const db = client.db("InventoryStore")
        const items = db.collection("items")
        const userId = jwt.verify(req.cookies.token, process.env.TOKEN_SECRET).id
        const result = await items.deleteOne({_id: new ObjectId(req.body.id),
        id_user: new ObjectId(userId)})
        if(result.deletedCount === 0) throw new Error("No item found")
        res.status(200).json(result)
    } catch(error){
        res.status(500).json(error)
    } finally {
        await client.close()
    }
})

route.put('/api/item', async (req, res) => {
    const {body} = req
    Object.keys(body).forEach(key => {
        if(body[key] === '') delete body[key]
    })
    try{
        console.log("PUT /api/item/:id")
        await client.connect()
        const db = client.db("InventoryStore")
        const items = db.collection("items")
        const filter = {_id: new ObjectId(body._id), 
            id_user: new ObjectId(req.cookies.user._id)}
        delete body._id
        const set = {$set: body}
        const result = await items.updateOne(filter, set)
        if(result.modifiedCount === 0) throw new Error("No item found")
        res.status('200').json(result)
    } catch(error){
        res.status(500).json(error)
    } finally {
        await client.close()
    }
})


module.exports = route