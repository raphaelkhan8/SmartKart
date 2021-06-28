require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const mode = process.env.NODE_ENV

const dbConnection = require('./config/db')
const products = require('./data/products')

dbConnection();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const foundProduct = products.find(product => product.id === req.params.id)
  res.json(foundProduct)
})

app.listen(port, () => {
  console.log(`Server (mode: ${mode}) listening on port ${port}`)
})