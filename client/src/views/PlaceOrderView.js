import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import { createOrder } from '../actions/orderActions'

const PlaceOrderView = ({ history }) => {
	const dispatch = useDispatch()

	const { shippingAddress, paymentMethod, cartItems } = useSelector(state => state.cart)
	const { address, city, state, zipcode, country } = shippingAddress

	// Calculate prices
	const itemsPrice = (cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)).toFixed(2)
	const shippingPrice = itemsPrice > 100 ? (itemsPrice * 0.15).toFixed(2) : (itemsPrice * 0.1).toFixed(2)
	const taxPrice = (itemsPrice * 0.1).toFixed(2)
	const totalPrice = (Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice)).toFixed(2)

	const { order, success, error } = useSelector(state => state.orderCreate)

	useEffect(() => {
		if (order) {
			history.push(`/order/${order._id}`)
		}
		// eslint-disable-next-line
	}, [history, success])

	const placeOrderHandler = () => {
		dispatch(createOrder({
			orderItems: cartItems,
			shippingAddress,
			paymentMethod,
			itemsPrice : Number(itemsPrice),
			shippingPrice: Number(shippingPrice),
			taxPrice: Number(taxPrice),
			totalPrice : Number(totalPrice)
		}))
	}

	return (
		<div>
			<CheckoutSteps step1 step2 step3 step4 />
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
							<h2>Cart Items</h2>
							{!cartItems.length ? <Message>Your cart is empty</Message> : 
							(<ListGroup variant='flush'>
								{cartItems.map((item, index) => (
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

							<ListGroupItem>
								{error && <Message variant='danger'>{error}</Message>}
							</ListGroupItem>

							<ListGroupItem className='d-grid gap-2'>
								<Button type='button' disabled={cartItems.length === 0} onClick={placeOrderHandler}>
									Place Order
								</Button>
							</ListGroupItem>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</div>
	)
}

export default PlaceOrderView;