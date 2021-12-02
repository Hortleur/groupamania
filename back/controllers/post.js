const auth = require('../services/auth.services')
const createHttpError = require('http-errors')

exports.createPost = async(req, res, next) => {
    try {
        const post = await auth.createPost(req, res)
        res.status(200).json({
            status: true,
            message: "Post créer",
            data: post
        })
    } catch (e) {
        next(createHttpError(e.statusCode, e.message))
    }
}

exports.allPost = async(req, res, next) => {
    try {
        const post = await auth.allPost(req, res)
        res.status(200).json({
            status: true,
            message: 'All Posts',
            data: post
        })
    } catch (e) {
        next(createHttpError(e.statusCode, e.message))
    }
}

exports.onePost = async(req, res, next) => {
    try {
        const post = await auth.onePost(req, res)
        res.status(200).json({
            status: true,
            message: 'One post',
            data: post
        })
    } catch (e) {
        next(createHttpError(e.statusCode, e.message))
    }
}

exports.deletePost = async(req, res, next) => {
    try {
        const post = await auth.deletePost(req, res)
        res.status(200).json({
            status : true,
            message: 'Post bien supprimer',
            data: post
        })
    } catch (e) {
        next(createHttpError(e.statusCode, e.message)) 
    }
}