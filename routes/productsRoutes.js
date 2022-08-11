const express = require('express')
const { getProducts, getProduct, postProduct, editProduct, deleteProduct, checkProductIsStock, postReview } = require('../controllers/productsController')

const router = express.Router()


router.post('/api/v1/products/checkStock', async(req, res) => await checkProductIsStock(req, res))
router.get('/api/v1/products', async(req, res) => await getProducts(req, res))
router.get('/api/v1/products/:productId', async(req, res) => await getProduct(req, res))

router.post('/api/v1/products', async(req, res) => await postProduct(req, res))

router.put('/api/v1/products/:productId', async(req, res) => await editProduct(req, res))
router.put('/api/v1/products/:productId/reviews', async(req, res) => await postReview(req, res))

router.delete('/api/v1/products/:productId/:productImageId', async(req, res) => await deleteProduct(req, res))

module.exports = router