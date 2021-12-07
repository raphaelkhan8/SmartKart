import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditView = ({ match, history }) => {

  const productId = match.params.id

  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
	const [description, setDescription] = useState('')
	const [image, setImage] = useState('')
	const [price, setPrice] = useState(0)
	const [countInStock, setCountInStock] = useState(0)

  const dispatch = useDispatch()

  const { loading, error, product } = useSelector(state => state.productDetails)

	const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = useSelector(state => state.productUpdate)

  useEffect(() => {
		// if product is successfully updated, reset productUpdate state and redirect to product list page
		if (successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET })
			history.push('/admin/productlist')
		} else {
				// if product is empty or it's id doesn't match the productId in the url, dispatch listProductDetails
				if (!product.name || product._id !== productId) {
					dispatch(listProductDetails(productId))
					// else (if state's product is correct), fill in form with product details
				} else {
					setName(product.name)
					setBrand(product.brand)
					setCategory(product.category)
					setDescription(product.description)
					setImage(product.image)
					setPrice(product.price)
					setCountInStock(product.countInStock)
				}
		}
  }, [dispatch, history, product, productId, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
		if (window.confirm(`Are you sure you want to update this product?`)) {
			dispatch(updateProduct({
				_id: productId, name, brand, category, description, image, price, countInStock
			}))
		}
  }

  return (
		<>
			<Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
			<FormContainer>
				<h1>Edit Product</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
				{loading ? <Loader /> : error ? (<Message variant='danger'>{error}</Message>) : (
					<Form onSubmit={submitHandler}>
						<FormGroup controlId='name'>
							<FormLabel>Name</FormLabel>
							<FormControl type='name' placeholder='Enter name' value={name}
								onChange={(e) => setName(e.target.value)}>
							</FormControl>
						</FormGroup>

						<FormGroup controlId='brand'>
							<FormLabel>Brand</FormLabel>
							<FormControl type='text' placeholder='Enter brand' value={brand} 
								onChange={(e) => setBrand(e.target.value)}>
							</FormControl>
						</FormGroup>

						<FormGroup controlId='category'>
							<FormLabel>Category</FormLabel>
							<FormControl type='text' placeholder='Enter category' value={category} 
								onChange={(e) => setCategory(e.target.value)}>
							</FormControl>
						</FormGroup>

						<FormGroup controlId='description'>
							<FormLabel>Description</FormLabel>
							<FormControl type='text' placeholder='Enter description' value={description} 
								onChange={(e) => setDescription(e.target.value)}>
							</FormControl>
						</FormGroup>

						<FormGroup controlId='image'>
							<FormLabel>Image</FormLabel>
							<FormControl type='text' placeholder='Enter image url' value={image} 
								onChange={(e) => setImage(e.target.value)}>
							</FormControl>
						</FormGroup>

						<FormGroup controlId='price'>
							<FormLabel>Price</FormLabel>
							<FormControl type='number' placeholder='Enter price' value={price} 
								onChange={(e) => setPrice(e.target.value)}>
							</FormControl>
						</FormGroup>

						<FormGroup controlId='countInStock'>
							<FormLabel>stock Count</FormLabel>
							<FormControl type='number' placeholder='Enter stock count' value={countInStock} 
								onChange={(e) => setCountInStock(e.target.value)}>
							</FormControl>
						</FormGroup>

						<Button type='submit' variant='primary'>Update</Button>
					</Form>
				)}
			</FormContainer>
		</>
  )
}

export default ProductEditView
