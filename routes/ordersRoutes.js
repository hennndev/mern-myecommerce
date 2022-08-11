const express = require('express')
const { createNewOrder, changeStatusOrder, getOrders, getOrderDetail, deleteOrder, paymentStripe } = require('../controllers/ordersController')
const router = express.Router()

router.get('/api/v1/orders', async(req, res) => await getOrders(req, res))
router.get('/api/v1/orders/:orderId', async(req, res) => await getOrderDetail(req, res))
router.post('/api/v1/orders/:orderUserId', async(req, res) => await createNewOrder(req, res))
router.put('/api/v1/orders/:orderId', async(req, res) => await changeStatusOrder(req, res))
router.delete('/api/v1/orders/:orderId', async(req, res) => await deleteOrder(req, res))


module.exports = router