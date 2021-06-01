import React from 'react'
import { Card } from 'react-bootstrap';

const Product = ({ product }) => {
  const { id, name, image, description, brand, price, countInStock, rating, numReviews } = product;
  return (
    <Card className='my-3 p-3 rounded'>
      <a href={`/product/${id}`}>
        <Card.Img src={image} variant='top' />
      </a>

      <Card.Body>
      <a href={`/product/${id}`}>
        <Card.Title as='div'><strong>{name}</strong></Card.Title>
      </a>

      <Card.Text as='div'>{description}</Card.Text>

      <Card.Text as='div'><div className='my-3'>{rating}/5 from {numReviews} reviews</div></Card.Text>
      </Card.Body>

      <Card.Text as ='h3'>${price}</Card.Text>
    </Card>
  )
}

export default Product