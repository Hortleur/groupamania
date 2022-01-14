const auth = require('../services/auth.services')
const createHttpError = require('http-errors');
const {
    PrismaClient
} = require('@prisma/client');
const prisma = new PrismaClient();


exports.signup = async (req, res, next) => {
    console.log(req.body)
        try {
            const user = await auth.signup(req, res)
            console.log(user)
            res.status(201).json({
                status: true,
                message: 'Utilisateur créer',
                data: user
            })
        } catch (e) {
            next(createHttpError(e.statusCode, e.message))
        }
    }

    exports.login = async (req, res, next) => {
        try {
            const userLog = await auth.login(req,res)
            res.status(200).json({
                status: true,
                message: "Connexion établie",
                data: userLog
            })
        } catch (e) {
            next(createHttpError(e.statusCode, e.message))
        }
    }

exports.all = async (req, res, next) => {
    try {
        const allUsers = await prisma.user.findMany({
            include:{
                profile: true,
                posts: true,
                Commentaire: true,
                Likes: true
            }
        })
        res.status(200).json({
            status: true,
            message: 'All users',
            data: allUsers
        })
    } catch (e) {
        next(createHttpError(e.statusCode, e.message))
    }
}

exports.oneUserProfile = async (req, res, next) => {
    try{
        const id = req.user.payload.id
    const oneUser = await prisma.user.findUnique({
        where: {
            id: Number(id)
        },
        include:{
            profile: true
        }
    })
        res.status(200).json({
            status: true,
            message: 'One user pROFILE',
            data: oneUser
        })
    } catch(e){
        next(createHttpError(e.statusCode, e.message))
    }
}
exports.oneUser = async (req, res, next) => {
    try{
        const id = req.user.payload.id
    const oneUser = await prisma.user.findUnique({
        where: {
            id: Number(id)
        },
        include:{
            Likes: true
        }
    })
        res.status(200).json({
            status: true,
            message: 'One user',
            data: oneUser
        })
    } catch(e){
        next(createHttpError(e.statusCode, e.message))
    }
}

exports.deleteUser = async (req, res, next) => {
    const id = req.user.payload.id
    if(id === req.user.payload.id || req.user.payload.isAdmin === 1){
        try {
            const id = req.user.payload.id
            const user = await prisma.user.delete({
                where: {
                    id: Number(id)
                },
            })
            res.status(201).json({
                status: true,
                message: "Compte bien supprimé",
                data: user
            })
        } catch (e) {
            next(createHttpError(e.statusCode, e.message))
        }
    }
    
}