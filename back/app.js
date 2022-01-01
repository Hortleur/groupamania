require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const {
    PrismaClient
} = require('@prisma/client')
const path = require('path')

const prisma = new PrismaClient()
const app = express()

const userRoutes = require('./routes/user')
const profileRoutes = require('./routes/profile')
const postRoutes = require('./routes/post')
const commentRoutes = require('./routes/comment')
const likeRoutes = require('./routes/likes')


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json())
app.use('/api', userRoutes);
app.use('/api', profileRoutes);
app.use('/api', postRoutes);
app.use('/api', commentRoutes);
app.use('/api', likeRoutes);
app.use('/image', express.static(path.join(__dirname, 'image')));

module.exports = app;