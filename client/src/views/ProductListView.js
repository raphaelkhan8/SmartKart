import React, { useEffect } from 'react'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts, deleteProduct } from '../actions/productActions'

const ProductListView = ({ history, match }) => {

  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const { loading, error, products } = productList

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	const productDelete = useSelector(state => state.productDelete)
	const { loading:loadingDelete, error:errorDelete, success:successDelete } = productDelete

  // only send dispatch if user is logged-in and an admin
  useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listProducts())
		} else {
			history.push('/login')
		}
  }, [dispatch, history, userInfo, successDelete])
	

	const createProductHandler = (product) => {
		if (window.confirm('Are you sure you want to add this product?')) {
			// CREATE PRODUCT
		}
	}

	const deleteProductHandler = (productId) => {
		if (window.confirm('Are you sure you want to delete this product?')) {
			dispatch(deleteProduct(productId))
		}
	}


  return (
    <div>
			<Row className='align-items-center'>
				<Col>
					<h1>Products</h1>
				</Col>
				<Col md={2} md={{ span: 2, offset: 0 }}>
					<Button className='my-3' onClick={createProductHandler}>
						<i className='fas fa-plus'></i> Create Product
					</Button>
				</Col>
			</Row>
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant='danger'>{errorDelete}</Message>}
			{loading ? <Loader /> : products ?
			(<Table striped bordered hover responsive className='table-sm'>
				<thead>
					<tr>
						<th>ID</th>
						<th>NAME</th>
						<th>BRAND</th>
						<th>CATEGORY</th>
						<th>PRICE</th>
					</tr>
				</thead>
				<tbody>
					{products.map(product => (
						<tr key={product._id}>
							<td>{product._id}</td>
							<td>{product.name}</td>
							<td>{product.brand}</td>
							<td>{product.category}</td>
							<td>${product.price}</td>
							<td>
								<LinkContainer to={`/admin/product/${product._id}/edit`}>
									<Button variant='light' className='btn-sm'>
										<i className='fas fa-edit'></i>
									</Button>
								</LinkContainer>
								<Button variant='danger' className='btn-sm' onClick={() => deleteProductHandler(product._id)}>
									<i className='fas fa-trash'></i>
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>) 
			: <Message variant='danger'>{error}</Message>}
    </div>
	)
}

export default ProductListView