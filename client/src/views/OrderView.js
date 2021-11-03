import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails } from '../actions/orderActions'

const OrderView = ({ match }) => {
	const dispatch = useDispatch()

	const orderId = match.params.id

	const { order, loading, error } = useSelector(state => state.orderDetails)
	const { orderItems, paymentMethod, shippingAddress, itemsPrice, shippingPrice, taxPrice, totalPrice,
		 user, isPaid, paidAt, isDelivered, deliveredAt } = order || {}
	const { address, city, state, zipcode, country } = shippingAddress || {}

	useEffect(() => {
		if (!order || order._id !== orderId) {
			dispatch(getOrderDetails(orderId))
		}
	}, [dispatch, order, orderId])

	return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
		<div>
			<h1>Order {order._id}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroupItem>
							<h2>Shipping</h2>
							<p>
								<strong>Name: </strong> {user.name}
							</p>
							<p>
								<strong>Email: </strong> <a href={`mailto:${user.email}`}>{user.email}</a>
							</p>
							<p>
								<strong>Address: </strong> {address}, {city}, {state} {zipcode} {country}
							</p>
							{isDelivered ? <Message variant='success'>Delivered on {deliveredAt}</Message> : 
								<Message variant='danger'>Order not delivered</Message>}
						</ListGroupItem>

						<ListGroupItem>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: </strong>{paymentMethod}
							</p>
							{isPaid ? <Message variant='success'>Paid on {paidAt}</Message> : 
								<Message variant='danger'>Order not paid</Message>}
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