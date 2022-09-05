const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
    },
})

UserSchema.pre('save', async function(next) { // Highly suggested to use function keyword so it'll be scoped to this document when using 'this'
    const salt = await bcrypt.genSalt(10)
    // salt generates random bytes with gensalt

    this.password = await bcrypt.hash(this.password, salt)
    // Hash looks for password as well as salt, gens password
    // Always hash passwords and never store passwords as string
})

UserSchema.methods.createJWT = function() {
    return jwt.sign({ userID: this._id, name: this.name }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME })
}

module.exports = mongoose.model('User', UserSchema)
