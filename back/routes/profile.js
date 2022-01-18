const express = require('express')
const router = express.Router()

const profile = require('../controllers/profile')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')


//read
router.get('/profile/:id', auth, profile.getProfile)
//update
router.put('/editProfileBio', auth, profile.editProfileBio)
router.put('/editProfilePic', auth, multer, profile.editProfilePic)

module.exports = router