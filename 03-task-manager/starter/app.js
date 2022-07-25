const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')

// middleware
app.use(express.static('./public'))
app.use(express.json())

// routes
app.use('/api/v1/tasks', tasks)

// app.get('/api/v1/tasks')        - get all the tasks
// app.post('/api/v1/tasks')       - create a new task
// app.get(/api/v1/tasks/:id')     - get single task
// app.patch('/api/v1/tasks/:id')  - update task
// app.delete('/api/v1/tasks/:id') - delete task

const port = 5000

const start = async () => {
    try {
        await connectDB()
        app.listen(port, console.log(`Server is listening on port ${port}`))
    } catch (err) {
        console.log(err)
    }

}

start()