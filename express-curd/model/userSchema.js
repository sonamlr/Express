const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxLength: [50, 'Name is less than 50 character']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true

    }
})

module.exports = mongoose.model("User", userSchema);