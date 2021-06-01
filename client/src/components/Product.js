import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
  const { id, name, image, description, brand, price, countInStock, rating, numReviews } = product;
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${id}`}>
        <Card.Img src={image} variant='top' />
      </Link>

      <Card.Body>
      <Link to={`/product/${id}`}>
        <Card.Title as='div'><strong>{name}</strong></Card.Title>
      </Link>

      <Card.Text as='div'>
        <Rating rating={rating} numReviews={numReviews} />
      </Card.Text>
      </Card.Body>

      <Card.Text as ='h3'>${price}</Card.Text>
    </Card>
  )
}

export default Product