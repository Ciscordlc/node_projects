const getAllJobs = async (req, res) => {
    res.send('All jobs')
}

const getJob = async (req, res) => {
    res.send('One job')
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