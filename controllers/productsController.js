const Mongoose = require('mongoose')
const cloudinary = require('cloudinary').v2
const Orders = require('../models/orders.js')
const Products = require('../models/products.js')

cloudinary.config({ 
    cloud_name: 'hennnpermanadev', 
    api_key: 394938371368973, 
    api_secret: 'FUZbzaLtxZIehXJTYhe0hghLEbA'
});

const getProducts = async (req, res) => {
    const { category, company, rating, price, discount, limit } = req.query
    let queriesObj = {}
    if(category) {
        queriesObj.productCategory = category 
    }
    if(company) {
        queriesObj.productCompany = company
    }
    if(rating) {
        queriesObj.productRating = {$lte: rating}
    }
    if(price) {
        queriesObj.productPrice = {$gte: price}
    }
    if(discount) {
        queriesObj.productDiscount = {$gte: discount}
    }

    try {
        let products = await Products.find(queriesObj).select('-__v -updatedAt').sort({createdAt: -1})
        const countDocs = await Products.countDocuments(queriesObj)
        if(limit) {
            if(limit === 10) {
                products = await Products.find(queriesObj).limit(limit).select('-__v -updatedAt').sort({createdAt: -1})
            } else {
                products = await Products.find(queriesObj).skip(limit - 10).limit(limit).select('-__v -updatedAt').sort({createdAt: -1})
            }
        }
        res.status(200).json({
            message: 'Success get products data',
            data: products,
            count: countDocs
        })
    } catch (error) {
        res.status(400).json({
            error: 'Failed get products data'
        })       
    }
}
const getProduct = async(req, res) => {
    try {
        const product = await Products.findById(req.params.productId).populate('reviews.userProfile')
        res.status(200).json({
            message: 'Success get spesific product',
            data: product
        })
    } catch (error) {
        res.status(400).json({
            error: 'Failed get spesific product'
        })
    }
}


const postProduct = async (req, res) => {
    try {
        await Products.create({...req.body})
        res.status(201).json({
            message: 'Success post product data'
        })
    } catch (error) {
        res.status(400).json({
            error: 'Failed post product data'
        })
    }
}
const postReview = async(req, res) => {
    const { orderId, ...reviewData } = req.body
    try {
        const product = await Products.updateOne({_id: req.params.productId}, {$push: {reviews: reviewData}})
        if(product) {
            await Orders.updateOne({_id: orderId, 'orderProducts.id': req.params.productId}, {$set: {"orderProducts.$.isReview": true}})
        }
        res.status(200).json({
            message: 'Success post new review'
        })
    } catch(error) {
        res.status(200).json({
            error: 'Failed post new review'
        })
    }
}
const editProduct = async (req, res) => {
    try {
        if(req.body.isFeatured) {
            await Products.updateOne({_id: req.params.productId}, {isFeatured: req.body.isFeatured})
        } else {
            if(req.body.oldProductImageID) {
                const { oldProductImageID, ...valuesData } = req.body
                await Products.updateOne({_id: req.params.productId}, {...valuesData}, async (err) => {
                    if(err) {
                        console.log(err)
                    } else {
                        await cloudinary.uploader.destroy(oldProductImageID, function(error, result) { })
                    }
                })
            } else {
                await Products.updateOne({_id: req.params.productId}, {...req.body})
            }
        }
        res.status(200).json({
            message: 'Success edit product data'
        })
    } catch (error) {
        res.status(400).json({
            error: 'Failed edit product data'
        })
    }
}

const deleteProduct = async(req, res) => {
    try {
        await Products.findByIdAndDelete(req.params.productId, async (err) => {
            if(err) {
                console.log(err)
            } else {
                await cloudinary.uploader.destroy(req.params.productImageId, function(error, result) { })
            }
        })
        res.status(200).json({
            message: 'Sucucess delete product data'
        })
    } catch (error) {
        res.status(400).json({
            error: 'Failed delete product data'
        })
    }
}

const checkProductIsStock = async(req, res) => {
    const { orderProducts } = req.body
    try {
        const data = await Products.find({
            "_id": {$in: orderProducts.map(item => Mongoose.Types.ObjectId(item.id))},
        }).select('_id productName productStock')
        const objProducts = orderProducts.reduce((obj, item) => Object.assign(obj, { [item.id]: {count: item.count} }), {})
        const mappingData = data.filter((item, idx) => item.productStock < objProducts[item._id].count).map(item => {
            return {
                id: item.id,
                productName: item.productName
            }
        })
        res.status(200).json({
            message: 'Success check product',
            data: mappingData
        })
    } catch (error) {
        res.status(400).json({
            error: 'Failed check product'
        })
    }
}


module.exports = {
    getProducts,
    getProduct,
    postReview,
    postProduct,
    editProduct,
    deleteProduct,
    checkProductIsStock
}