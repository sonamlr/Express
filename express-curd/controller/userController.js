const mongoose = require('mongoose');
const User = require('../model/userSchema.js');
exports.home = (req, res) => {
    res.send("Hello World");
}

exports.createUser = async(req, res) => {
    //extract info
    try {
        const { name, email } = req.body
        if (!name || !email) {
            throw new Error("Name and email is required");
        }
        // const userExit = User.findOne({ email })
        // if (userExit) {
        //     throw new Error("User is already exits");
        // }
        const user = await User.create({
            name,
            email
        })
        res.status(201).json({
            success: true,
            message: 'user created successfully',
            user
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })

    }
}

exports.getUser = async(req, res) => {
    try {
        const users = await User.find({})
        res.status(201).json({
            success: true,
            users
        })


    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })


    }
}

exports.deleteUser = async(req, res) => {
    try {
        const userId = req.params.id
        await User.findByIdAndDelete(userId)
        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })

    }
}

exports.editUser = async(req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json({
            success: true,
            message: 'User updated successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            success: false,
            message: error.message
        })

    }
}