import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PayPalButton } from 'react-paypal-button-v2'
import axios from 'axios'
import { Row, Col, ListGroup, Image, Card, ListGroupItem, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import { ORDER_PAY_RESET, ORDER_DELIVER_RESET } from '../constants/orderConstants'
import { formatDate } from '../utils/helpers'

const OrderView = ({ history, match }) => {
	const dispatch = useDispatch()

	const orderId = match.params.id

	const [sdkReady, setSdkReady] = useState(false)

	const { order, loading, error } = useSelector(state => state.orderDetails)
	const { userInfo } = useSelector(state => state.userLogin)

	const { _id, orderItems, paymentMethod, shippingAddress, itemsPrice, shippingPrice, taxPrice, totalPrice,
			user, isPaid, paidAt, isDelivered, deliveredAt } = order || {}
	const { address, city, state, zipcode, country } = shippingAddress || {}
	const { isAdmin } = userInfo || {}

	// rename loading and success to unique names (ex. loading -> loadingPay) in order to avoid confusion
	const { loading: loadingPay, success: successPay } = useSelector(state => state.orderPaid)
	const { loading: loadingDeliver, success: successDeliver } = useSelector(state => state.orderDeliver)

	useEffect(() => {
		if (!userInfo) {
			history.push('/login')
		}

		// dynamically add PayPal script to OrderView html
		const addPayPalScript = async () => {
			const { data: clientId } = await axios.get('/api/config/paypal')
			const script = document.createElement('script')
			script.type = 'text/javascript'
			script.async = true
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
			script.onload = () => {
				setSdkReady(true)
			}
			document.body.appendChild(script)
		}

		if (!order || successPay || successDeliver || order._id !== orderId) {
			dispatch({ type: ORDER_PAY_RESET })
			dispatch({ type: ORDER_DELIVER_RESET })
			dispatch(getOrderDetails(orderId))
		} else if (!order.isPaid) {
			if (!window.paypal) {
				addPayPalScript()
			} else {
				setSdkReady(true)
			}
		}
	}, [dispatch, order, orderId, successPay, loadingDeliver, successDeliver])

	const successPaymentHandler = (paymentResult) => {
		dispatch(payOrder(orderId, paymentResult))
	}

	const deliverHandler = () => {
		dispatch(deliverOrder(_id))
	}

	return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : 
		<div>
			<h1>Order {_id}</h1>
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
							{isDelivered ? <Message variant='success'>Delivered on {formatDate(deliveredAt)}</Message> : 
								<Message variant='danger'>Order not delivered</Message>}
						</ListGroupItem>

						<ListGroupItem>
							<h2>Payment Method</h2>
							<p>
								<strong>Method: </strong>{paymentMethod}
							</p>
							{isPaid ? <Message variant='success'>Paid on {formatDate(paidAt)}</Message> : 
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
							
							{!order.isPaid && (
								<ListGroupItem>
									{loadingPay && <Loader />}
									{!sdkReady ? <Loader /> : (
										<PayPalButton amount={totalPrice} onSuccess={successPaymentHandler} />
									)}
								</ListGroupItem>
							)}

							{loadingDeliver && <Loader />}
							{isAdmin && isPaid && !isDelivered && (
								<ListGroupItem> 
									<Button type='button' className='btn btn-block' onClick={deliverHandler}>
										Mark As Delivered
									</Button>
								</ListGroupItem>
							)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</div>
}

export default OrderView;