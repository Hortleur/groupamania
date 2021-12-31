const express = require('express')
const router = express.Router()

const comment = require('../controllers/comment')
const auth = require('../middleware/auth')

//create
router.post('/createComment', auth, comment.createComment)


//delete
router.delete('/comment/delete/:id', auth, comment.deleteComment)

module.exports = router