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
    console.log(req.body)
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
    const accessToken = jwt.signAccessToken(user)
    return {
        ...user,
        accessToken
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

exports.createProfile = async (req, res) => {
    const{
        bio,
        picture
    } = req.body
    const profile = await prisma.profile.create({
        data:{
            bio,
            picture : picture = `${req.protocol}://${req.get('host')}/image/${req.file.filename}`
        },
        include: {
            user: true
        }
    })
    return profile
}

exports.editProfile = async (req, res) => {
    const {id} = req.params
    const {
        bio,
        picture
     } = req.body
    const profile = await prisma.profile.update({
        where: {id},
        data : {
            bio,
            picture : picture = `${req.protocol}://${req.get('host')}/image/${req.file.filename}`
        },
        include: {
            user: true
        }
    })
    return profile
}
    
//post

exports.createPost = async (req, res) => {
    const {
        title,
        content
    } = req.body
    const post = await prisma.post.create({
        data:{
            title,
            content
        },
        include:{
            user: true
        }
    })
    return post
}

exports.allPost = async(req, res) => {
    const allPost = await prisma.post.findMany()
    return  allPost
}

exports.onePost = async(req, res) => {
    const {id} = req.params
    const onePost = await prisma.post.findUnique({
        where: {
            id: Number(id)
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

//images

exports.createImage = async(req, res) => {
    const  imageUrl  = req.body
    const postImage = await prisma.image.create({
        data:{
            imageUrl: imageUrl = `${req.protocol}://${req.get('host')}/image/${req.file.filename}`
        },
        include:{
            post: true
        }
    })
    return postImage
}

exports.oneImage = async(req, res) => {
    const id = req.params
    const postImage = await prisma.image.findUnique({
        where:{
            id: Number(id)
        }
    })
    return postImage
}

exports.updateImage = async(req, res) => {
    const id = req.params
    const imageUrl = req.body
    const postImage = await prisma.image.update({
        data :{
            imageUrl: imageUrl = `${req.protocol}://${req.get('host')}/image/${req.file.filename}`
        },
        where:{
            id: Number(id)
        }
    })
    return postImage
}

exports.deleteImage = async(req, res) => {
    const id = req.params
    const postImage = await prisma.image.delete({
        where:{
            id: Number(id)
        }
    })
    return postImage
}