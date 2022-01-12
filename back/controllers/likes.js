const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient
const createHttpError = require('http-errors')

exports.addLike = async(req, res, next) => {
    try {
        
        const postId = req.body
        const userId = req.user.payload.id     
        const addLike = await prisma.likes.create({
            data:{
                user:{
                    connect: {id : userId}
                },
                post:{
                    connect: postId
                }
            }
        })
        res.status(200).json({
            status: true,
            message:"post Liké",
            data: addLike
        })
    } catch (e){
        next(createHttpError(e.statusCode, e.message))
    }
}

exports.isLike = async(req, res, next) => {
    try {
        const id = req.user.payload.id
        const postId = req.payload.id
        const userLiked = await prisma.likes.findUnique({
            where: {
                userId: Number(id),
                postId: Number(postId)
            }
        })
            res.status(200).json({
                status: true,
                message: 'User Liked',
                data: userLiked
            })
    } catch (e) {
        next(createHttpError(e.statusCode, e.message))
    }
}

exports.deleteLike = async(req, res, next) => {
    try {
        let id = JSON.stringify(req.params)
        const deletelike = await prisma.likes.delete({
            where: {id: Number(id.split(':')[1].slice(1,3))}
        })
            res.status(200).json({
                status: true,
                message:'like supprimé',
                data: deletelike
            })
    } catch (e) {
        next(createHttpError(e.statusCode, e.message))
    }
}