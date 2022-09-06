const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')

const register = async (req, res) => {
    // Optional, but can send more meaningful error messages with mongoose validators
    // const { name, email, password } = req.body
    // if (!name || !email || !password){ throw new BadRequestError('Must provide name, email, and password') }\
    const user = await User.create({ ...req.body }) // Gets mongoose to handle all of the validation
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
    // Easier, for the time-being, to check for error here as opposed to just the error handler
    const { email, password } = req.body

    if (!email || !password) {
        throw new BadRequestError('Please provide email and password')
    }

    const user = await User.findOne({ email })
    if (!user) {
        throw new UnauthenticatedError('Invalid Email')
    }

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid Password')
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })

}

module.exports = {
    register,
    login,
}