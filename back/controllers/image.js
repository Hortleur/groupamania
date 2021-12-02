const auth = require('../services/auth.services')
const createHttpError = require('http-errors')
const fs = require('fs')

exports.createImage = async(req, res, next) => {
    try {
        const image = await auth.createImage(req, res)
        res.status(200).json({
            status: true,
            message: "image créer",
            data: image
        })
    } catch (e) {
        next(createHttpError(e.statusCode, e.message))
    }
}

exports.oneImage = async(req, res, next) => {
    try {
        const image = await auth.oneImage(req, res)
        res.status(200).json({
            status: true,
            message: 'one image',
            data: image
        })
    } catch (e) {
        next(createHttpError(e.statusCode, e.message))
    }
} 

exports.updateImage = async(req, res, next) => {
    try {
        const image = await auth.updateImage(req, res)
        res.status(200).json({
            status: true,
            message: 'Image mise à jour',
            data: image
        })
    } catch (e) {
        next(createHttpError(e.statusCode, e.message))
    }
}

exports.deleteImage = async(req, res, next) => {
    try {
        const image = await auth.deleteImage(req, res)
        const filename = image.imageUrl.split('/image/')[1]
        fs.unlink(`image/${filename}`, () => {
                res.status(200).json({
                status: true,
                message: 'image supprimée',
                data: image
            })
        })
        
    } catch (e) {
        next(createHttpError(e.statusCode, e.message))
    }
}