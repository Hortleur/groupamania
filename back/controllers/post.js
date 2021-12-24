const {
    PrismaClient
} = require('@prisma/client');
const prisma = new PrismaClient();
const createHttpError = require('http-errors')
const fs = require('fs')

exports.createPost = async(req, res, next) => {
    try {
        const {
            title,
            content,
            imageAltText,
            userId
        } = JSON.parse(req.body.formContent)
        const image = `${req.protocol}://${req.get('host')}/image/${req.file.filename}`
        const post = await prisma.post.create({
            data:{
                title,
                content,
                image,
                imageAltText,
                user:{
                   connect: {id : userId}
                } 
            },
        })
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
        const allPost = await prisma.post.findMany({
            orderBy:{
                createdAt: 'desc'
            },
            include:{
                user: true,
                Commentaire: true,
                Likes: true
            }
        })
        res.status(200).json({
            status: true,
            message: 'All Posts',
            data: allPost
        })
    } catch (e) {
        next(createHttpError(e.statusCode, e.message))
    }
}

exports.onePost = async(req, res, next) => {
    try {
        const {id} = req.params
    const onePost = await prisma.post.findUnique({
        where: {
            id: Number(id)
        },
        include:{
            user: true,
            Commentaire: true,
            Likes: true
        }
    })
        res.status(200).json({
            status: true,
            message: 'One post',
            data: onePost
        })
    } catch (e) {
        next(createHttpError(e.statusCode, e.message))
    }
}

exports.deletePost = async(req, res, next) => {
    try {
        const {id} = req.params
    const post = await prisma.post.delete({
        where: {
            id: Number(id)
        } 
    })
        const filename = image.imageUrl.split('/image/')[1]
        fs.unlink(`image/${filename}`, () => {
            res.status(200).json({
                status : true,
                message: 'Post bien supprimer',
                data: post
            })
        })
    } catch (e) {
        next(createHttpError(e.statusCode, e.message)) 
    }
}