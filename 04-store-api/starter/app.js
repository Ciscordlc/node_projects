const express = require('express')
const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')
const errorMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found')
require('dotenv').config()
require('express-async-errors')

const app = express()

// middleware
app.use(express.json())
app.use('/api/v1/products', productsRouter)
app.use(errorMiddleware)
app.use(notFoundMiddleware)

// routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>')
})

// products routes


const port = process.env.PORT || 5000

const start = async () => {
    try {
        // connectDB
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Listening on port: ${port}`))
    } catch (err) {
        console.log(err)
    }
}

start()