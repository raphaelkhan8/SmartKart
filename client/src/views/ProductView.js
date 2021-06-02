import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, ListGroupItem, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'

const ProductView = ({ match }) => {
  const { name, image, rating, numReviews, price, description, countInStock } = products.find(product => product.id === match.params.id)
  return (
    <div>
      <Link className='btn btn-light my-3' to='/'>Cancel</Link>
      <Row>

        <Col md={6}>
          <Image src={image} alt={name} fluid />
        </Col>

        <Col md={3}>
          <ListGroup variant='flush'>
            
            <ListGroupItem>
              <h3>{name}</h3>
            </ListGroupItem>

            <ListGroupItem>
              <Rating rating={rating} numReviews={numReviews} />
            </ListGroupItem>

            <ListGroupItem>
              Price: ${price}
            </ListGroupItem>

            <ListGroupItem>
              {description}
            </ListGroupItem>

          </ListGroup>
        </Col>

        <Col md={2}>
          <Card>
            <ListGroup variant='flush'>

              <ListGroupItem>
                <Row>
                  <Col>Price: </Col>
                  <Col><strong>${price}</strong></Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Status: </Col>
                  <Col>{countInStock ? 'In Stock' : 'Out of Stock'}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Button className='col-12' type='button' disabled={!countInStock}>Add To Cart</Button>
              </ListGroupItem>

            </ListGroup>
          </Card>
        </Col>
      </Row>

    </div>
  )
}

export default ProductView
