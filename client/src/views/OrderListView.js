import React, { useEffect } from 'react'
import { Button, Table, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { getAllOrders } from '../actions/orderActions'
import { formatDate, redXStyling } from '../utils/helpers'

const OrderListView = ({ history }) => {

  const dispatch = useDispatch()

  const orderList = useSelector(state => state.orderList)
  const { loading, error, orders } = orderList

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

  useEffect(() => {
		// if user is NOT an admin, redirect to login page
		if (userInfo && !userInfo.isAdmin) {
			history.push('/login')
		} else {
			dispatch(getAllOrders())
		}
  }, [dispatch, history, userInfo])


  return (
		<div>
			<Meta title='Orders List' />
			<Row className='align-items-center'>
				<Col>
					<h1>Orders</h1>
				</Col>
			</Row>
			{loading ? <Loader /> : orders ?
			(<Table striped bordered hover responsive className='table-sm'>
				<thead>
					<tr>
						<th>ORDER ID</th>
						<th>USERNAME</th>
						<th>ORDER DATE + TIME</th>
						<th>PRICE</th>
						<th>PAYMENT STATUS</th>
						<th>SHIPPING STATUS</th>
						<th>DETAILS</th>
					</tr>
				</thead>
				<tbody>
					{orders.map(order => (
						<tr key={order._id}>
							<td>{order._id}</td>
							<td>{order.user && order.user.name}</td>
							<td>{formatDate(order.createdAt)}</td>
							<td>${order.totalPrice}</td>
							<td>{order.isPaid ? ('PAID: ' + formatDate(order.paidAt)) : (<i className='fas fa-times' style={ redXStyling }/>)}</td>
							<td>{order.isDelivered ? ('DELIVERED: ' + formatDate(order.deliveredAt)) :  (<i className='fas fa-times' style={ redXStyling }/>)}</td>
							<td>
								<LinkContainer to={`/order/${order._id}`}>
									<Button variant='light' className='btn-sm'>
										View Order
									</Button>
								</LinkContainer>
							</td>
						</tr>
					))}
				</tbody>
			</Table>) 
			: <Message variant='danger'>{error}</Message>}
    	</div>
	)
}

export default OrderListView