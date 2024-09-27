const userModel = require("../model/userSchema");
const emailValidator = require('email-validator')
const bcrypt = require('bcrypt')
exports.signup = async(req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;
    console.log(name, email, password, confirmPassword);

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Every field is required"
        })
    }
    const validEmail = emailValidator.validate(email)
    if (!validEmail) {
        return res.status(400).json({
            success: false,
            message: "Email must be valid"
        })
    }
    if (password !== confirmPassword) {
        return res.status(400).json({
            success: false,
            message: "Password and confirm password doesn't match"
        })
    }

    try {
        const userInfo = userModel(req.body);
        const result = await userInfo.save();
        return res.status(200).json({
            success: true,
            message: result
        });
    } catch (error) {
        if (error.code == 11000) {
            return res.status(400).json({
                success: false,
                message: "Account is already created"
            })
        }
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.signin = async(req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Every field is required"
        })
    }
    try {
        const user = await userModel.findOne({ email }).select('+password');
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials'
            })
        }

        const token = user.jwtToken();
        user.password = undefined
        const cookieOption = {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        }
        res.cookie("token", token, cookieOption);
        res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.getuser = async(req, res, next) => {
    const userId = req.user.id
    try {
        const user = await userModel.findById(userId);
        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

exports.logout = (req, res) => {
    try {
        const cookieOption = {
            expires: new Date(),
            httpOnly: true
        }
        res.cookie("token", null, cookieOption);
        res.status(200).json({
            success: true,
            message: "Loged out"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}