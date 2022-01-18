const express = require('express')
const router = express.Router()

const user = require('../controllers/user')
const auth = require('../middleware/auth')

//create
router.post('/signup', user.signup)
router.post('/login', user.login)

//read
router.get('/user', auth, user.all)

router.get('/user/profile', auth, user.oneUserProfile)

router.get('/user/likes', auth, user.oneUser)

//delete
router.delete('/user/delete/:id', auth, user.deleteUser)

module.exports = router;