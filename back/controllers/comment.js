const auth = require('../services/auth.services')
const createHttpError = require('http-errors')

exports.createComment = async(req, res, next) => {
    try {
        const comment = await auth.createComment(req, res)
        res.status(200).json({
            status: true,
            message: "Commentaire créer",
            data: comment
        })
    } catch (e) {
        next(createHttpError(e.statusCode, e.message))
    }
}

exports.allComment = async(req, res, next) => {
    try {
        const comment = await auth.allComment(req, res)
        res.status(200).json({
            status: true,
            message:'All Comments',
            data: comment
        })
    } catch (e) {
        next(createHttpError(e.statusCode, e.message))
    }
}

exports.oneComment = async (req, res, next) => {
    try {
        const comment = await auth.oneComment(req, res)
        res.status(200).json({
            status: true,
            message: 'un commentaire',
            data: comment
        })
    } catch (e) {
        next(createHttpError(e.statusCode, e.message))
    }
}

exports.deleteComment = async(req, res, next) => {
    try {
        const comment = await auth.deleteComment(req, res)
        res.status(200).json({
            status: true,
            message:'Commentaire bien supprimer',
            data: comment
        })
    } catch (e) {
        next(createHttpError(e.statusCode, e.message))
    }
}