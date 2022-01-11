const createHttpError = require('http-errors')
const {
    PrismaClient
} = require('@prisma/client');
const prisma = new PrismaClient();

exports.createComment = async(req, res, next) => {
    try {
        const {comment,
               postId,
                } = req.body
        const userId = req.user.payload.id
    const commentaire = await prisma.commentaire.create({
        data:{
            comment,
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
            message: "Commentaire créer",
            data: commentaire
        })
    } catch (e) {
        next(createHttpError(e.statusCode, e.message))
    }
}

exports.deleteComment = async(req, res, next) => {
    try {
        const {id} = req.params
    const commentaire = await prisma.commentaire.delete({
        where: {
            id: Number(id)
        }
    })
        res.status(200).json({
            status: true,
            message:'Commentaire bien supprimer',
            data: commentaire
        })
    } catch (e) {
        next(createHttpError(e.statusCode, e.message))
    }
}