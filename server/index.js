const express = require('express')
const app = express()
const port = process.env.PORT || 5000

const products = require('./data/products')

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
  console.log(`Server listening at http://localhost:${port}`)
})