import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector  } from 'react-redux'
import { Row, Col, Image, ListGroup, ListGroupItem, Card, Button, Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { listProductDetails, createProductReview } from '../actions/productActions'
import { addToCart } from '../actions/cartActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import { formatDate } from '../utils/helpers'

const ProductView = ({ match, history }) => {
  const [quantity, setQuantity] = useState(1)
  const [productRating, setProductRating] = useState(0)
  const [productComment, setProductComment] = useState('')
 
  const dispatch = useDispatch()

  const { loading, error, product } = useSelector(state => state.productDetails)
  const { name, image, rating, numReviews, price, description, countInStock } = product

  const { userInfo } = useSelector(state => state.userLogin)

  const { success: createReviewSuccess, error: createReviewError } = useSelector(state => state.productCreateReview)

  useEffect(() => {
    if (createReviewSuccess) {
      alert('Review Submitted!')
      // reset product review form to defualt state after review has been sucessfully submitted
      setProductRating(0)
      setProductComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match.params.id, createReviewSuccess])

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, quantity))
    history.push('/cart')
  }

  const reviewSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(match.params.id, {
      rating: productRating,
      comment: productComment
    }))
  }

  return (
    <div>
      <Link className='btn btn-light my-3' to='/'>Cancel</Link>
      { loading ? <Loader /> :
          error ? <Message variant='danger'>{error}</Message> : 
        ( <div>
          <Meta title={name} />
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
                            <FormControl as='select' value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                              {[...Array(countInStock).keys()].map(num => (
                                <option key={num + 1} value={num + 1}>
                                  {num + 1}
                                </option>
                              ))}
                            </FormControl>
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
            <Row>
              <Col md={6}>
                <h2>Reviews</h2>
                {product.reviews.length === 0 && <Message>No reviews</Message>}
                <ListGroup variant='flush'>
                  {product.reviews.map(review => (
                    <ListGroupItem key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating rating={review.rating} />
                      <p>{formatDate(review.createdAt).substring(0, formatDate(review.createdAt).indexOf('@'))}</p>
                      <p>{review.comment}</p>
                    </ListGroupItem>
                  ))}
                  <ListGroupItem>
                    <h2>Review product</h2>
                    {createReviewError && <Message variant='danger'>{createReviewError}</Message>}
                    {userInfo ? (
                      <Form onSubmit={reviewSubmitHandler}>
                        <FormGroup controlId='rating'>
                          <FormLabel>Rating</FormLabel>
                          <FormControl as='select' value={productRating} onChange={(e) => setProductRating(e.target.value)}>
                            <option value=''>Select...</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                          </FormControl>
                        </FormGroup>
                        <FormGroup controlId='comment'>
                          <FormLabel>Comment</FormLabel>
                          <FormControl as="textarea" row='3' value={productComment} 
                            onChange={(e) => setProductComment(e.target.value)}>
                          </FormControl>
                        </FormGroup>
                        <Button type='submit' variant='primary'>Submit</Button>
                      </Form>) : 
                      (<Message>Please <Link to='/login'>sign in</Link> to leave a review</Message>)}
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
          </div>
        )
      }
    </div>
  )
}

export default ProductView
