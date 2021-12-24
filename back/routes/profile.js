const express = require('express')
const router = express.Router()

const profile = require('../controllers/profile')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')

//create
router.post('/createProfile', auth, multer, profile.createProfile)

//update
router.put('/editProfile/:id', auth, multer, profile.editProfile)

module.exports = router