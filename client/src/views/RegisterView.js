import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'

const RegisterView = ({ location, history }) => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegisterInfo = useSelector(state => state.userRegister)
  const { loading, error, userInfo } = userRegisterInfo

  // location.search corresponds to the url query string 
  const redirect = location.search ? location.search.split('=')[1] : '/'

  // redirect to home if user is already logged-in
  useEffect(() => {
    if (userInfo) {
      history.push(redirect) 
    }
  }, [redirect, userInfo, history])

  const submitHandler = (e) => {
    e.preventDefault()
    // check passwords before dispatching register action
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(username, email, password))
    }
  }

  return (
    <FormContainer>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <h1>Sign Up</h1>
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

        <Button type='submit' variant='primary'>Register</Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Returning Customer?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login Here</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterView
