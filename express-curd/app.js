require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connectTODb = require('./config/db.js');


// express middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())

// init connection to db
connectTODb()

// routes 
const userRoutes = require('./routes/userRoutes.js')
app.use('/', userRoutes);

module.exports = app;