const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    productCategory: {
        type: String,
        required: true
    },
    productCompany: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productStock: {
        type: Number,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    productImage: {
        productImageURL: {
            type: String,
            required: true
        },
        productImageID: {
            type: String,
            required: true
        }
    },
    productDiscount: {
        type: Number,
        default: 0
    },
    productRating: {
        type: Number,
        required: true
    },
    isFeatured: {
        type: Boolean,
        default: true
    },
    reviews: [
        {
            reviewRating: {
                type: Number,
                required: true
            },
            reviewBody: {
                type: String,
                required: true
            },
            userProfile: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Users',
                required: true
            },
            username: {
                type: String,
                required: true
            },
            createdAt: {
                type: String,
                required: true
            }
        }
    ]
}, { timestamps: true})

const Products = mongoose.model('Products', productSchema)

module.exports = Products