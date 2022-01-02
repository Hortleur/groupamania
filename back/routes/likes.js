const express = require('express')
const router = express.Router()

const likes = require('../controllers/likes')
const auth = require('../middleware/auth')

//create
router.post('/like', auth, likes.addLike)

//read
router.get('/like/isLike', auth, likes.isLike)

//delete
router.delete('/like/deletelike', auth, likes.deleteLike)


module.exports = router