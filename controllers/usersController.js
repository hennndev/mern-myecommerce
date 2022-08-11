const Users = require('../models/users')
const jwt = require('jsonwebtoken')
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
    cloud_name: 'hennnpermanadev', 
    api_key: 394938371368973, 
    api_secret: 'FUZbzaLtxZIehXJTYhe0hghLEbA'
});

const maxAge = 60 * 60 * 24
const createToken = (id) => {
    return jwt.sign({id}, 'secret-app-token', {
        expiresIn : maxAge
    })
}


const getUsers = async(req, res) => {
    try {
        const users = await Users.find({}).select('_id username email profileImage country address telpNumber postCode ordersHistory createdAt').populate('ordersHistory').sort({createdAt: -1})
        res.status(200).json({
            message: 'Success get users',
            data: users
        })
    } catch(error) {
        res.status(400).json({
            error: 'Failed get users'
        })
    }
}

const getUser = async (req, res) => {
    try {
        const user = await Users.findOne({_id: req.params.userId}).select('_id username email profileImage country address telpNumber postCode ordersHistory').populate('ordersHistory')
        res.status(200).json({
            message: 'Success get current user',
            data: user
        })
    } catch(error) {
        res.status(400).json({
            error: 'Failed get current user'
        })
    }
}

const editUser = async(req, res) => {
    const { oldProfileImageID, orderId, ...valuesData } = req.body
    try {
        if(orderId) {
            await Users.updateOne({_id: req.params.userId}, {$pull: {ordersHistory: orderId}})
        } else {
            const user = await Users.updateOne({_id: req.params.userId}, {...valuesData})
            if(oldProfileImageID && user) {
                await cloudinary.uploader.destroy(oldProfileImageID, function(error, result) { })
            }
        }
        res.status(200).json({
            message: 'Success remove order history'
        })
    } catch(error) {
        res.status(400).json({
            error: 'Failed remove order history'
        })
    }
}

const signinPost = async(req, res) => {
    const { email, password } = req.body
    try {
        const user = await Users.login(email, password)
        const token = createToken(user.id)
        res.status(200).json({
            message: 'Success Login',
            user,
            token
        })
    } catch(error) {
        res.status(400).json({
            error: error.message
        })
    }
}

const signupPost = async(req, res) => {
    const { email, password, username } = req.body
    try {
        await Users.create({email, password, username})
        res.status(201).json({
            message: 'Success create new user',
        })
    } catch(error) {
        res.status(400).json({
            error: error.message
        })
    }
}

module.exports = {
    signinPost,
    signupPost,
    editUser,
    getUsers,
    getUser
}