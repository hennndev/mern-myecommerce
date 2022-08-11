const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcryptjs')


const usersSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        profileImageURL: {
            type: String,
            default: ""
        },
        profileImageID: {
            type: String,
            default: ""
        }
    },
    country: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        default: ""
    },
    telpNumber: {
        type: Number,
        default: ""
    },
    postCode: {
        type: Number,
        default: ""
    },
    ordersHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Orders'
        },
    ]
}, {
    timestamps: true
})


usersSchema.pre('save', async function(next) {
    const existUser = await Users.findOne({email: this.email})
    if(existUser) {
        throw Error('Email already used!')
    } else {  
        const salt = await bcrypt.genSalt()
        this.password = await bcrypt.hash(this.password, salt)  
        next()
    }
})



usersSchema.statics.login = async function(email, password) {
    const existUser = await this.findOne({email})
    if(existUser) {
        const checkPassword = await bcrypt.compare(password, existUser.password)
        if(checkPassword) {
            return {
                id: existUser._id,
                username: existUser.username,
                email: existUser.email
            }
        } else {
            throw Error('Password incorrect! Repeat agian')
        }
    } else {
        throw Error('User not exist! Repeat again')
    }
}


const Users = mongoose.model('Users', usersSchema)

module.exports = Users