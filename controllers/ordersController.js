const Mongoose = require("mongoose")
const Users = require('../models/users')
const Orders = require('../models/orders')
const Products = require('../models/products')

const getOrders = async(req, res) => {
    try {
        const ordersData = await Orders.find({}).sort({createdAt: -1}).populate('orderBuyer')
        res.status(200).json({
            message: 'Success get orders data',
            data: ordersData
        })
    } catch (error) {
        res.status(400).json({
            error: 'Failed get orders data'
        })
    }
}

const getOrderDetail = async(req, res) => {
    try {
        const orderData = await Orders.findById(req.params.orderId).sort({createdAt: -1}).populate('orderBuyer')
        res.status(200).json({
            message: 'Success get orders data',
            data: orderData
        })
    } catch (error) {
        res.status(400).json({
            error: 'Failed get orders data'
        })
    }
}

const changeStatusOrder = async(req, res) => {
    try {
        if(req.body.orderStatus === "Cancelled") {
            // Increment product stock when user cancelled order
            let productsTemp = [];
            for (const product of req.body.orderProducts) {
                productsTemp.push({
                    updateOne: {
                        "filter": { "_id": Mongoose.Types.ObjectId(product.id) },
                        "update": { $inc: { "productStock": + product.count } }
                    }
                })
            }
            await Products.bulkWrite(productsTemp)
        }
        await Orders.findByIdAndUpdate(req.params.orderId, {
            orderStatus: req.body.orderStatus
        })
        res.status(200).json({
            message: 'Success change status order'
        })
    } catch(error) {
        res.status(400).json({
            error: 'Failed change status order'
        })
    }   
}

const createNewOrder = async(req, res) => {
    try {
        const newOrder = await Orders.create({...req.body})
        if(newOrder) {
            await Users.updateOne({_id: req.params.orderUserId}, {$push: {ordersHistory: newOrder._id}})

            // Decrement product stock when user ordered
            let productsTemp = [];
            for (const product of req.body.orderProducts) {
                productsTemp.push({
                    updateOne: {
                        "filter": { "_id": Mongoose.Types.ObjectId(product.id) },
                        "update": { $inc: { "productStock": - product.count } }
                    }
                })
            }
            await Products.bulkWrite(productsTemp)
        }
        res.status(201).json({
            message: 'Success create new order'
        })
    } catch (error) {
        res.status(400).json({
            error: 'Failed create new order'
        })
    }
}

const deleteOrder = async(req, res) => {
    try {
        await Orders.findByIdAndDelete(req.params.orderId)
        res.status(200).json({
            message: 'Success delete order'
        })
    } catch (error) {
        res.status(400).json({
            error: 'Failed delete order'
        })
    }
}



module.exports = {
    getOrders,
    getOrderDetail,
    changeStatusOrder,
    createNewOrder,
    deleteOrder,
}