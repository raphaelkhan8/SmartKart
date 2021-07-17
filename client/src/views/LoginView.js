import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'

const LoginView = ({ location }) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // location.search corresponds to the url query string 
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const submitHandler = (e) => {
    e.preventDefault()
    // DISPATCH LOGIN
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup controlId='email'>
          <FormLabel>Email Address</FormLabel>
          <FormControl type='email' placeholder='Enter email' value={email} onChange={(e) => {setEmail(e.target.value)}}></FormControl>
        </FormGroup>

        <FormGroup controlId='password'>
          <FormLabel>Password</FormLabel>
          <FormControl type='password' placeholder='Enter password' value={password} onChange={(e) => {setPassword(e.target.value)}}></FormControl>
        </FormGroup>

        <Button type='submit' variant='primary'>Sign In</Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register Here</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginView
