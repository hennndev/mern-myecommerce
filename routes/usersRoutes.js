const express = require('express')
const {
    signinPost,
    signupPost,
    editUser,
    getUser,
    getUsers
} = require('../controllers/usersController')
const router = express.Router()

router.get('/api/v1/users', async(req, res) => await getUsers(req, res))
router.get('/api/v1/users/:userId', async(req, res) => await getUser(req, res))
router.put('/api/v1/users/:userId', async(req, res) => await editUser(req, res))
router.post('/users/signin', async(req, res) => await signinPost(req, res))
router.post('/users/signup', async(req, res) => await signupPost(req, res))


module.exports = router