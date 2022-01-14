const {
    PrismaClient
} = require('@prisma/client');
const prisma = new PrismaClient();

require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');
const createHttpError = require('http-errors');

// User
exports.signup = async (req) => {

    const hash = bcrypt.hashSync(req.body.password, 10)
    const {
        email,
        name
    } = req.body
    let user = await prisma.user.create({
        data: {
            email,
            "password" : hash,
            name
        },
    })
    const token = await jwt.signAccessToken(user)
    user = {
        ...user,
        token
    }
    return user;
}

exports.login = async (req) => {
    const {
        email,
        password
    } = req.body
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })
    if (!user) {
        throw createHttpError.NotFound('Utilisateur non existant')
    }
    const checkPassword = bcrypt.compareSync(password, user.password)
    if (!checkPassword) throw createHttpError.Unauthorized('Email ou Mot de Passe invalide')
    delete user.password
    const token = await jwt.signAccessToken(user)
    console.log(user, token)
    return {
        ...user,
        token
    }
}