require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const mode = process.env.NODE_ENV

const dbConnection = require('./config/db')
const productRouter = require('./routes/productRoutes')
const userRouter = require('./routes/userRoutes')
const orderRouter = require('./routes/orderRoutes')
const { notFound, errorHandler } = require('./middleware/errorMiddleware')

dbConnection();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())
app.use('/api/products', productRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server (mode: ${mode}) listening on port ${port}`)
})