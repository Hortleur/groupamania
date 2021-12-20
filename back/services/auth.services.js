const {
    PrismaClient
} = require('@prisma/client');
const prisma = new PrismaClient();

require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');
const createHttpError = require('http-errors');

// User
exports.signup = async (req, res) => {

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

exports.login = async (req, res) => {
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
    return {
        ...user,
        token
    }

}

exports.all = async (req, res) => {
    const allUsers = await prisma.user.findMany()
    return allUsers
}

exports.deleteUser = async (req, res) => {
    const {
        id
    } = req.params
    const user = await prisma.user.delete({
        where: {
            id: Number(id)
        },
    })
    return user
}


// Profile
exports.getProfile = async (req, res) => {
    const id = req.params
    const profile = await prisma.profile.findUnique({
        where: {id} 
    })
    return profile
}

exports.createProfile = async (req, res) => {
    const{
        bio,
        userId,
        imageAltText
    } = JSON.parse(req.body.formContent)
    const image = `${req.protocol}://${req.get('host')}/image/${req.file.filename}`
    const profile = await prisma.profile.create({
        data:{
            bio,
            image,
            imageAltText
        },
        user: {
            connect: {id: userId}
        }
    })
    return profile
}

exports.editProfile = async (req, res) => {
    const {id} = req.params
    const {
        bio,
        imageAltText
     } = JSON.parse(req.body.formContent)
     const image = `${req.protocol}://${req.get('host')}/image/${req.file.filename}`
    const profile = await prisma.profile.update({
        where: {id},
        data : {
            bio,
            image,
            imageAltText
        },
    })
    return profile
}
    
//post

exports.createPost = async (req, res) => {
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
    return post
}

exports.allPost = async(req, res) => {
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
    return  allPost
}

exports.onePost = async(req, res) => {
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
    return onePost
}

exports.deletePost = async(req, res) => {
    const {id} = req.params
    const post = await prisma.post.delete({
        where: {
            id: Number(id)
        } 
    })
    return post
}

//comment

exports.createComment = async(req, res) => {
    const {comment} = req.body
    const commentaire = await prisma.commentaire.create({
        data:{
            comment
        },
        include:{
            post: true,
            user: true
        }
    })
    return commentaire
}

exports.allComment = async(req, res) => {
    const commentaire = await prisma.commentaire.findMany()
    return commentaire
}

exports.oneComment = async(req, res) => {
    const {id} = req.params
    const commentaire = await prisma.commentaire.findUnique({
        where:{
            id: Number(id)
        }
    })
    return commentaire
}

exports.deleteComment = async(req, res) => {
    const {id} = req.params
    const commentaire = await prisma.commentaire.delete({
        where: {
            id: Number(id)
        }
    })
    return commentaire
}