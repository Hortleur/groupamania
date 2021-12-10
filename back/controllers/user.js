const auth = require('../services/auth.services')
const createHttpError = require('http-errors');


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
        const user = await auth.all();
        res.status(200).json({
            status: true,
            message: 'All users',
            data: user
        })
    } catch (e) {
        next(createHttpError(e.statusCode, e.message))
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await auth.deleteUser(req, res)
        res.status(201).json({
            status: true,
            message: "Compte bien supprimé",
            data: user
        })
    } catch (e) {
        next(createHttpError(e.statusCode, e.message))
    }
}