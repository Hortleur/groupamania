const {
    PrismaClient
} = require('@prisma/client');
const prisma = new PrismaClient();
const createHttpError = require('http-errors')

exports.createProfile = async (req, res, next) => {
    try {
        const{
            bio,
            userId,
        } = JSON.parse(req.body.formContent)
        console.log(req.body.formContent)
        const image = `${req.protocol}://${req.get('host')}/image/${req.file.filename}`
        const profile = await prisma.profile.create({
            data:{
                bio,
                image,
                user: {
                    connect: {id: userId}
                }
            } 
        })
        res.status(201).json({
            status: true,
            message: 'Profil créer',
            data: profile
        })
    } catch (e) {
        next(createHttpError(e.statusCode, e.message))
    }
}

exports.getProfile = async (req, res, next) => {
    try {
        console.log(req)
        const {id} = req.user.payload.id
        const profile = await prisma.profile.findUnique({
            where: {
                userId: Number(id)
            }
        })
        res.status(200).json({
            status: true,
            message: 'One Profile',
            data: profile
        })
    } catch (e) {
        next(createHttpError(e.statusCode, e.message))
    }
}

exports.editProfile = async (req, res, next) => {
    try {
        const id = req.user.payload.id
    const {
        bio,
     } = JSON.parse(req.body.formContent)
     const image = `${req.protocol}://${req.get('host')}/image/${req.file.filename}`
    const profile = await prisma.profile.update({
        where: {id : id},
        data : {
            bio,
            image,
        },
    })
        res.status(201).json({
            status: true,
            message: 'Profil bien mis à jour',
            data: profile
        })
    } catch (e) {
        next(createHttpError(e.statusCode, e.message))
    }
}