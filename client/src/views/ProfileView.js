import React, { useState, useEffect } from 'react'
import { Col, Row, Form, Button, FormGroup, FormLabel, FormControl, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { getUserOrders } from '../actions/orderActions'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { formatDate, redXStyling } from '../utils/helpers'

const ProfileView = ({ history }) => {

  const [name, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [updated, setUpdated] = useState(false)

  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userOrders = useSelector(state => state.userOrders)
  const { loading:loadingOrders, error:errorOrders, orders } = userOrders

  // redirect to home if login page if users is not logged-in
  useEffect(() => {
    if (!userInfo) {
      history.push('/login') 
    } else {
        if (!user || !user.name || updated) {
          dispatch(getUserDetails('profile'))
          dispatch(getUserOrders())
          dispatch({ type: USER_UPDATE_PROFILE_RESET })
        } else {
          setUsername(user.name)
          setEmail(user.email)
        }
    }
  }, [userInfo, JSON.stringify(user), updated, dispatch, history])

  const submitHandler = (e) => {
    setMessage(null)
    setUpdated(false)
    e.preventDefault()
    // check passwords before dispatching register action
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      setUpdated(true)
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  return (
		<div>
			<Meta title='My Profile' />
			<Row>
				<Col md={3}>
					{message && <Message variant='danger'>{message}</Message>}
					{updated && <Message variant='success'>Profile Updated</Message>}
					{error && <Message variant='danger'>{error}</Message>}
					{loading && <Loader />}
					<h2>My Profile</h2>
					<Form onSubmit={submitHandler}>
						<FormGroup controlId='username'>
							<FormLabel>Username</FormLabel>
							<FormControl type='username' placeholder='Enter username' value={name} onChange={(e) => {setUsername(e.target.value)}}></FormControl>
						</FormGroup>

						<FormGroup controlId='email'>
							<FormLabel>Email Address</FormLabel>
							<FormControl type='email' placeholder='Enter email' value={email} onChange={(e) => {setEmail(e.target.value)}}></FormControl>
						</FormGroup>

						<FormGroup controlId='password'>
							<FormLabel>Password</FormLabel>
							<FormControl type='password' placeholder='Type new password here' value={password} onChange={(e) => {setPassword(e.target.value)}}></FormControl>
						</FormGroup>

						<FormGroup controlId='confirmPassword'>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl type='password' placeholder='Confirm new password' value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}}></FormControl>
						</FormGroup>

						<Button type='submit' variant='primary'>Update</Button>
					</Form>
				</Col>
				<Col md={9}>
					<h2>My Orders</h2>
					{loadingOrders ? <Loader /> : orders ?
					(<Table striped bordered hover responsive className='table-sm'>
						<thead>
							<tr>
								<th>ORDER ID</th>
								<th>ORDER DATE</th>
								<th>TOTAL</th>
								<th>PAYMENT STATUS</th>
								<th>DELIVERY STATUS</th>
								<th>DETAILS</th>
							</tr>
						</thead>
						<tbody>
							{orders.map(order => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{formatDate(order.createdAt)}</td>
									<td>${order.totalPrice}</td>
									<td>{order.isPaid ? 'PAID: ' + formatDate(order.paidAt) : <i className='fas fa-times' style={ redXStyling }></i> }</td>
									<td>{order.isDelivered ? 'DELIVERED: ' + formatDate(order.deliveredAt) : <i className='fas fa-times' style={ redXStyling }></i> }</td>
									<td>
										<LinkContainer to={`/order/${order._id}`}>
											<Button variant='light' className='btn-sm'>View Order</Button>
										</LinkContainer></td>
								</tr>
							))}
						</tbody>
					</Table>) 
					: <Message variant='danger'>{errorOrders}</Message>}
				</Col>
			</Row>
		</div>
  )
}

export default ProfileView