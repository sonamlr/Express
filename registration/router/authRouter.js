const express = require('express')
const authRouter = express.Router()
const { signup, signin, getuser, logout } = require('../controller/authController.js');
const jwtAuth = require('../middleware/jwtAuth.js');

authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
authRouter.post('/getuser', jwtAuth, getuser);
authRouter.post('/logout', jwtAuth, logout);
module.exports = authRouter;