const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ordersSchema = new Schema({
    orderBuyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    orderProducts: {
        type: Array,
        required: true
    },
    orderTotalProducts: {
        type: Number,
        required: true
    },
    orderTotalPrice : {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ["Cancelled", "Pending", "Ordered", "Packed", "Shipped", "Delivered"],
        default: 'Pending',
    },
    orderInfo: {
        name: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        telpNumber: {
            type: Number,
            required: true
        },
        postCode: {
            type: Number,
            required: true
        },
        emailActive: {
            type: String,
            required: true
        }
    },
    paymentMethod: {
        type: String,
        enum: ['COD', 'Credit Card'],
        required: true
    }
}, {
    timestamps: true
})


const Orders = mongoose.model('Orders', ordersSchema)

module.exports = Orders