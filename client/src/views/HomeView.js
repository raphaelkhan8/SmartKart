import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Paginate from '../components/Paginate'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts } from '../actions/productActions'

const HomeView = ({ match }) => {
  const dispatch = useDispatch()

  // keyword from Searchbox
  const keyword = match.params.keyword

  // Pagination variable
  const pageNumber = match.params.pageNumber || 1

  const productList = useSelector(state => state.productList)
  const { loading, products, pages, page, error } = productList

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? <Loader /> : 
        error ? <Message variant='danger'>{error}</Message> :
          <div>
            <Row>
              {products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>

            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
          </div>
      }
    </div>
  )
}

export default HomeView
