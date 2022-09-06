const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../errors')

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({})
    res.status(StatusCodes.OK).json(jobs)
}

const getJob = async (req, res) => {
    const { id: jobID } = req.params

    const job = await Job.findOne({ _id: jobID })
    if (!job) {
        throw new NotFoundError('Job not found')
    }

    res.status(StatusCodes.OK).json(job)
}

const createJob = async (req, res) => {
    res.send('Created job')
}

const updateJob = async (req, res) => {
    res.send('Updated job')
}

const deleteJob = async (req, res) => {
    res.send('Deleted job')
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
}