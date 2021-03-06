import React, { useEffect } from 'react'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Paginate from '../components/Paginate'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { listProducts, deleteProduct, createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductListView = ({ history, match }) => {

  	const pageNumber = match.params.pageNumber || 1

  	const dispatch = useDispatch()

 	const productList = useSelector(state => state.productList)
  	const { loading, error, products, pages, page } = productList

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	const productDelete = useSelector(state => state.productDelete)
	const { loading:loadingDelete, error:errorDelete, success:successDelete } = productDelete

	const productCreate = useSelector(state => state.productCreate)
	const { loading:loadingCreate, error:errorCreate, success:successCreate, product:createdProduct } = productCreate

  useEffect(() => {
		// reset productCreate state when page is rendered
		dispatch({ type: PRODUCT_CREATE_RESET })
		// if user is NOT an admin, redirect to login page
		if (!userInfo.isAdmin) {
			history.push('/login')
		} 
		// if product successfully created, redirect to product-edit page
		if (successCreate) {
			history.push(`/admin/product/${createdProduct._id}/edit`)
			// else, get list of products
		} else {
			dispatch(listProducts('', pageNumber))
		}
  }, [dispatch, history, userInfo, successDelete, successCreate, createdProduct, pageNumber])
	

	const createProductHandler = () => {
		dispatch(createProduct())
	}

	const deleteProductHandler = (productId) => {
		if (window.confirm('Are you sure you want to delete this product?')) {
			dispatch(deleteProduct(productId))
		}
	}


  return (
    	<div>
			<Meta title='Products List' />
			<Row className='align-items-center'>
				<Col>
					<h1>Products</h1>
				</Col>
				<Col md={{ span: 2, offset: 0 }}>
					<Button className='my-3' onClick={createProductHandler}>
						<i className='fas fa-plus'></i> Create Product
					</Button>
				</Col>
			</Row>
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant='danger'>{errorDelete}</Message>}
			{loadingCreate && <Loader />}
			{errorCreate && <Message variant='danger'>{errorCreate}</Message>}
			{loading ? (<Loader />) : products ?
			(<div>
				<Table striped bordered hover responsive className='table-sm'>
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
				</Table>

				<Paginate pages={pages} page={page} isAdmin={true} />
			</div>) 
			: (<Message variant='danger'>{error}</Message>)}
    	</div>
	)
}

export default ProductListView