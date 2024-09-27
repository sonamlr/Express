require('dotenv').config()
const express = require('express')
const app = express()
const authRouter = require('./router/authRouter.js')
const cors = require('cors')
const connectToDb = require('./config/db.js')
const cookieParser = require('cookie-parser')

app.use(express.json())
app.use(cors())
app.use(cookieParser())

connectToDb()
app.use('/api/auth', authRouter)

app.use('/', (req, res) => {
    res.send("JWT Token")
})


module.exports = app;