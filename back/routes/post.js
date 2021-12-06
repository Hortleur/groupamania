const express = require('express')
const router = express.Router()

const post = require('../controllers/post')
const auth = require('../middleware/auth')

//create
router.post('/createPost', auth, post.createPost)

//read

router.get('/post', post.allPost)
router.get('/post/:id', auth, post.onePost)

router.delete('/post/delete/:id', auth, post.deletePost)

module.exports = router