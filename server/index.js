require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const mode = process.env.NODE_ENV

const dbConnection = require('./config/db')
const productRouter = require('./routes/productRoutes')
const { notFound, errorHandler } = require('./middleware/error')

dbConnection();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/api/products', productRouter)
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server (mode: ${mode}) listening on port ${port}`)
})