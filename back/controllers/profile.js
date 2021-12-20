const auth = require('../services/auth.services')
const createHttpError = require('http-errors')

exports.createProfile = async (req, res, next) => {
    try {
        const profile = await auth.createProfile(req, res)
        res.status(201).json({
            status: true,
            message: 'Profil créer',
            data: profile
        })
    } catch (e) {
        next(createHttpError(e.statusCode, e.message))
    }
}

exports.editProfile = async (req, res, next) => {
    try {
        const profile = await auth.editProfile(req, res)
        res.status(201).json({
            status: true,
            message: 'Profil bien mis à jour',
            data: profile
        })
    } catch (e) {
        next(createHttpError(e.statusCode, e.message))
    }
}

exports.getProfile = async(req, res, next) => {
    try{
        const profile = await auth.getProfile(req, res)
        res.status(200).json({
            status: true,
            message:'profile bien récupérer',
            data: profile
        })
    } catch (e){
        next(createHttpError(e.statusCode, e.message))
    }
}