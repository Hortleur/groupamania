const express = require('express')
const router = express.Router()

const profile = require('../controllers/profile')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

//create
router.post('/createProfile', auth, multer, profile.createProfile)

//read
router.get('/profile/:id', auth, profile.getProfile)
//update
router.put('/editProfile', auth, multer, profile.editProfile)

module.exports = router