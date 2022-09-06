const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllJobs = async (req, res) => {
    const { userID } = req.user
    const jobs = await Job.find({ createdBy: userID }).sort('createdAt')
    res.status(StatusCodes.OK).json({ count: jobs.length, jobs})
}

const getJob = async (req, res) => {
    const { id: jobID } = req.params
    const { userID } = req.user

    const job = await Job.findOne({ _id: jobID, createdBy: userID })
    if (!job) {
        throw new NotFoundError('Job not found')
    }

    res.status(StatusCodes.OK).json(job)
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userID
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ created: job })
}

const updateJob = async (req, res) => {
    const { id: jobID } = req.params
    const { userID } = req.user


    const job = await Job.findOneAndUpdate({ _id: jobID, createdBy: userID }, req.body, {
        new: true,
        runValidators: true
    })
    if (!job) {
        throw new NotFoundError('Job not found')
    }

    res.status(StatusCodes.OK).json({ updated: job })
}

const deleteJob = async (req, res) => {
    const { id: jobID } = req.params

    const job = await Job.findOneAndDelete({ _id: jobID })
    if (!job) {
        throw new NotFoundError('Job not found')
    }

    res.status(StatusCodes.OK).json({ deleted: job })
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
}