import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails } from '../actions/orderActions'

const OrderView = ({ match }) => {
	const dispatch = useDispatch()

	const orderId = match.params.id

	const { order, loading, error } = useSelector(state => state.orderDetails)
	const { orderItems, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice, shippingAddress } = order || {}
	const { address, city, state, zipcode, country } = shippingAddress || {}

	useEffect(() => {
		console.log(orderId)
		dispatch(getOrderDetails(orderId))
		// eslint-disable-next-line
	}, [])

	return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
		<div>
			<h1>Order {order._id}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroupItem>
							<h2>Shipping</h2>
							<p>
								<strong>Address: </strong>{address}, {city}, {state} {zipcode} {country}
							</p>
						</ListGroupItem>

						<ListGroupItem>
							<h2>Payment Method</h2>
							<strong>Method: </strong>{paymentMethod}
						</ListGroupItem>

						<ListGroupItem>
							<h2>Order Items</h2>
							{!orderItems.length ? <Message>Your order is empty</Message> : 
							(<ListGroup variant='flush'>
								{orderItems.map((item, index) => (
									<ListGroupItem key={index}>
										<Row>
											<Col md={1}>
												<Image src={item.image} alt={item.name} fluid rounded />
											</Col>
											<Col>
												<Link to={`/product/${item.id}`}>{item.name}</Link>
											</Col>
											<Col md={4}>
												{item.quantity} X ${item.price} = ${item.quantity * item.price}
											</Col>
										</Row>
									</ListGroupItem>
								))}
							</ListGroup>)}
						</ListGroupItem>

					</ListGroup>
				</Col>

				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroupItem>
								<h2>Order Summary</h2>
							</ListGroupItem>

							<ListGroupItem>
								<Row>
									<Col>Items</Col>
									<Col>${itemsPrice}</Col>
								</Row>
							</ListGroupItem>

							<ListGroupItem>
								<Row>
									<Col>Shipping</Col>
									<Col>${shippingPrice}</Col>
								</Row>
							</ListGroupItem>

							<ListGroupItem>
								<Row>
									<Col>Tax</Col>
									<Col>${taxPrice}</Col>
								</Row>
							</ListGroupItem>

							<ListGroupItem>
								<Row>
									<Col>Total</Col>
									<Col>${totalPrice}</Col>
								</Row>
							</ListGroupItem>

						</ListGroup>
					</Card>
				</Col>
			</Row>
		</div>
}

export default OrderView;