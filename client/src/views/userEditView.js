import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, FormGroup, FormLabel, FormControl, FormCheck } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails } from '../actions/userActions'

const UserEditView = ({ match, history }) => {

  const userId = match.params.id

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const { loading, error, user } = useSelector(state => state.userDetails)

  // redirect to home if user is already logged-in
  useEffect(() => {
		if (!user.name || user._id !== userId) {
			dispatch(getUserDetails(userId))
		} else {
			setUsername(user.name)
			setEmail(user.email)
			setIsAdmin(user.isAdmin)
		}
  }, [dispatch, user, userId])

  const submitHandler = (e) => {
    e.preventDefault()
		if (isAdmin) {
			window.confirm(`Are you sure you want to set ${user.name} as an admin?`)
		}
  }

  return (
		<>
			<Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link>
			<FormContainer>
				<h1>Edit User</h1>
				{loading ? <Loader /> : error ? (<Message variant='danger'>{error}</Message>) : (
					<Form onSubmit={submitHandler}>
						<FormGroup controlId='username'>
							<FormLabel>Username</FormLabel>
							<FormControl type='username' placeholder='Enter username' value={username} readOnly></FormControl>
						</FormGroup>

						<FormGroup controlId='email'>
							<FormLabel>Email Address</FormLabel>
							<FormControl type='email' placeholder='Enter email' value={email} readOnly></FormControl>
						</FormGroup>

						<FormGroup controlId='isadmin'>
							<FormCheck type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e) => {setIsAdmin(e.target.checked)}}></FormCheck>
						</FormGroup>

						<Button type='submit' variant='primary'>Update</Button>
					</Form>
				)}
			</FormContainer>
		</>
  )
}

export default UserEditView
