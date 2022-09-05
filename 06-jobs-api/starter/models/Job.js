const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must provide job name'],
    }
})

module.exports = mongoose.model('Job', JobSchema)