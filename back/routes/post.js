const express = require('express')
const router = express.Router()

const post = require('../controllers/post')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')


//create
router.post('/createPost', auth, multer, post.createPost)

//read

router.get('/post', auth, post.allPost)
router.get('/post/onePost/:id', auth, post.onePost)

//delete
router.delete('/post/delete/:id', auth, post.deletePost)

module.exports = router