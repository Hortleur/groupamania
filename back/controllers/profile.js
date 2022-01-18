const {
    PrismaClient
} = require('@prisma/client');
const prisma = new PrismaClient();
const createHttpError = require('http-errors')

exports.getProfile = async (req, res, next) => {
    try {
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

exports.editProfileBio = async (req, res, next) => {
    try {
        const id = req.user.payload.id
        const {
            bio
        } = req.body
        const profile = await prisma.profile.update({
            where: {id : id},
            data : {
                bio: bio
            }
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

exports.editProfilePic = async (req, res, next) => {
    try {
        const id = req.user.payload.id
     const image = `${req.protocol}://${req.get('host')}/image/${req.file.filename}`
    const profile = await prisma.profile.update({
        where: {id : id},
        data : {
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