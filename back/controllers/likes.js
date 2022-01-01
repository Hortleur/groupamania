const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient
const createHttpError = require('http-errors')

exports.addLike = async(req, res, next) => {
    try {
        const {
            postId,
            userId
        } = req.body
        
        const like = await prisma.likes.create({
            data:{
                user:{
                    connect: {id : userId}
                },
                post:{
                    connect:{id: postId}
                }
            }
        })
        res.status(200).json({
            status: true,
            message:"post Liké",
            data: like
        })
    } catch (e) {
        next(createHttpError(e.statusCode, e.message))
    }
}