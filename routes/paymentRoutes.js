const express = require('express')
require('dotenv').config({path: './config/config.env'})
const stripe = require('stripe')(process.env.STRIPE_KEY)

const router = express.Router()
router.post('/api/v1/payment', async(req, res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd"
    }, (stripeErr, stripeRes) => {
        if(stripeErr) {
            res.status(500).json(stripeErr)
        } else {
            res.status(200).json(stripeRes)
        }
    })
})

module.exports  = router