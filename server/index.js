require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const path = require('path')
const app = express()
const { PORT, NODE_ENV, PAYPAL_CLIENT_ID } = process.env

const dbConnection = require('./config/db')
const productRouter = require('./routes/productRoutes')
const userRouter = require('./routes/userRoutes')
const orderRouter = require('./routes/orderRoutes')
const uploadRouter = require('./routes/uploadRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

dbConnection();

// use morgan for API logging
if (NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.use('/api/upload', uploadRouter)

app.get('/api/config/paypal', (req, res) => res.send(PAYPAL_CLIENT_ID))

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

const prodDirName =  __dirname.slice(0, __dirname.lastIndexOf('/'))

if (NODE_ENV === 'production') {
  app.use(express.static(path.join(prodDirName, '/client/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(prodDirName, 'client', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('Hello World!')
  })
}

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server (mode: ${NODE_ENV}) listening on port ${PORT}`)
})