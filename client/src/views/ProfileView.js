import React, { useState, useEffect } from 'react'
import { Col, Row, Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails } from '../actions/userActions'

const ProfileView = ({ history }) => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails)
  const { loading, error, user } = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  // redirect to home if login page if users is not logged-in
  useEffect(() => {
    if (!userInfo) {
      history.push('/login') 
    } else {
        if (!user.name) {
            dispatch(getUserDetails('profile'))
        } else {
            setUsername(user.name)
            setEmail(user.email)
        }
    }
  }, [userInfo, user, dispatch, history])

  const submitHandler = (e) => {
    e.preventDefault()
    // check passwords before dispatching register action
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      // DISPATCH UPDATE PROFILE
    }
  }

  return <Row>
      <Col md={3}>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <h2>My Profile</h2>
        <Form onSubmit={submitHandler}>
        <FormGroup controlId='username'>
            <FormLabel>Username</FormLabel>
            <FormControl type='username' placeholder='Enter username' value={username} onChange={(e) => {setUsername(e.target.value)}}></FormControl>
            </FormGroup>

            <FormGroup controlId='email'>
            <FormLabel>Email Address</FormLabel>
            <FormControl type='email' placeholder='Enter email' value={email} onChange={(e) => {setEmail(e.target.value)}}></FormControl>
            </FormGroup>

            <FormGroup controlId='password'>
            <FormLabel>Password</FormLabel>
            <FormControl type='password' placeholder='Enter password' value={password} onChange={(e) => {setPassword(e.target.value)}}></FormControl>
            </FormGroup>

            <FormGroup controlId='confirmPassword'>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}}></FormControl>
            </FormGroup>

            <Button type='submit' variant='primary'>Update</Button>
        </Form>
      </Col>
      <Col md={9}>
          <h2>My Orders</h2>
      </Col>
  </Row>
}

export default ProfileView