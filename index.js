const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const productsRoute = require('./routes/productsRoutes')
const usersRoutes = require('./routes/usersRoutes')
const ordersRoutes = require('./routes/ordersRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
require('dotenv').config({path: './config/config.env'})

const app = express()

app.use(express.static(__dirname + '/client/build'))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'))
})

mongoose.connect(process.env.MONGOODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(process.env.PORT || 5000, () => console.log('Connected to server'))
}).catch(() => console.log('Failed connect to database'))


app.use(express.json())
app.use(cors())
app.use(productsRoute)
app.use(usersRoutes)
app.use(ordersRoutes)
app.use(paymentRoutes)