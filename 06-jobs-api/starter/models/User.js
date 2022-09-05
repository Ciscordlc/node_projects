const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide username'],
        minlength: [5, 'Name must be longer than 5 characters'],
        maxlength: [50, 'Name must not exceed 50 characters'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Must provide email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Must provide valid email',
        ],
        unique: true, // Creates a unique index
    },
    password: {
        type: String,
        required: [true, 'Must provide password'],
        minlength: [6, 'Password must be longer than 6 characters'],
        maxlength: [12, 'Password must not exceed 12 characters'],
        trim: true,
    },
})

module.exports = mongoose.model('User', UserSchema)
