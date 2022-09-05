const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    // Optional, but can send more meaningful error messages with mongoose validators
    // const { name, email, password } = req.body
    // if (!name || !email || !password){ throw new BadRequestError('Must provide name, email, and password') }\
    const user = await User.create({ ...req.body }) // Gets mongoose to handle all of the validation

    const token = jwt.sign({ userID: user._id, name: user.name }, process.env.JWT_SECRET, { expiresIn: '30d' })
    
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
    res.send('login user')
}

module.exports = {
    register,
    login,
}