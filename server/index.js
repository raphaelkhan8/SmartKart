require('dotenv').config()
const express = require('express')
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

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.use('/api/upload', uploadRouter)

app.get('/api/config/paypal', (req, res) => res.send(PAYPAL_CLIENT_ID))

app.use('/uploads', express.static(path.join(path.resolve(), '/uploads')))

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server (mode: ${NODE_ENV}) listening on port ${PORT}`)
})