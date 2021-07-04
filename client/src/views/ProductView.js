import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux'
import { Row, Col, Image, ListGroup, ListGroupItem, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails } from '../actions/productActions'
import { addToCart } from '../actions/cartActions'

const ProductView = ({ match, history }) => {
  const [quantity, setQuantity] = useState(0)

  const dispatch = useDispatch()

  const { loading, error, product } = useSelector(state => state.productDetails)
  const { name, image, rating, numReviews, price, description, countInStock } = product

  useEffect(() => {
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match.params.id])

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, quantity))
    history.push('/cart')
  }

  return (
    <div>
      <Link className='btn btn-light my-3' to='/'>Cancel</Link>
      { loading ? <Loader /> :
          error ? <Message variant='danger'>{error}</Message> : 
        (
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
                  <Rating rating={rating || 0} numReviews={numReviews || 0} />
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

                  {countInStock > 0 && (
                    <ListGroupItem>
                      <Row>
                        <Col>Quantity</Col>
                        <Col>
                          <Form.Control as='select' value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                            {[...Array(countInStock).keys()].map(num => (
                              <option key={num + 1} value={num + 1}>
                                {num + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroupItem>
                  )}

                  <ListGroupItem>
                    <Button onClick={addToCartHandler} className='col-12' type='button' disabled={!countInStock}>
                      Add To Cart</Button>
                  </ListGroupItem>

                </ListGroup>
              </Card>
            </Col>
          </Row>
        )
      }
    </div>
  )
}

export default ProductView
