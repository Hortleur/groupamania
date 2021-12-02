const express = require('express')
const router = express.Router()

const image = require('../controllers/image')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')


//create

router.post('/createImage', auth, multer, image.createImage)

//read

router.get('/image/:id', auth, image.oneImage)

// update
router.put('/image/update/:id', auth, multer, image.updateImage)

//delete
router.delete('/image/delete/:id', auth, image.deleteImage)

module.exports = router