const express = require('express')
const router = express.Router()

const likes = require('../controllers/likes')
const auth = require('../middleware/auth')

//create
router.post('/like', auth, likes.addLike)

//delete
//router.delete('/like', auth, likes.deleteLike)


module.exports = router