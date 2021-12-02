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
const imageRoutes = require('./routes/image')


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json())
app.use('/api/auth/', userRoutes);
app.use('/api/auth/', profileRoutes);
app.use('/api/auth/', postRoutes);
app.use('/api/auth/', commentRoutes);
app.use('/api/auth/', imageRoutes);

module.exports = app;