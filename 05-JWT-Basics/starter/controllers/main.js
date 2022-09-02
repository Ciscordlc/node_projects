const CustomAPIError = require('../errors/custom-error')
// check username, password in post(login) request
// if exist create new JWT
// send back to front-end

// setup authentication so only the request with JWT can access the dashboard

const login = async(req, res) => {
    const { username, password } = req.body

    // 3 options to validate:
        // Mongoose validation
        // Joi
        // Check in the controller

    if (!username || !password){
        throw new CustomAPIError('Please provide email and password', 400)
    }
    
    res.status(200).json({user: username, pass: password})
}

const dashboard = async (req, res) => {
    const luckyNumber = Math.random() * 100
    res.status(200).json({ msg: `Hello, user`, secret:`Here is your authorized data, your lucky number is ${luckyNumber}` })
}

module.exports = { login, dashboard }