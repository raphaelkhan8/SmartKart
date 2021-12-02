import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, FormGroup, FormLabel, FormControl, FormCheck } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserAdmin } from '../actions/userActions'
import { USER_UPDATE_ADMIN_RESET } from '../constants/userConstants'

const UserEditView = ({ match, history }) => {

  const userId = match.params.id

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const dispatch = useDispatch()

  const { loading, error, user } = useSelector(state => state.userDetails)

	const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = useSelector(state => state.userUpdateAdmin)

  useEffect(() => {
		// if update is successful, reset updateAdmin state and redirect to user list page
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_ADMIN_RESET })
			history.push('/admin/userlist')
			// else (if the user doesn't exist or the state id doesn't match the url param's id), dispatch user details request action
		} else {
			if (!user.name || user._id !== userId) {
				dispatch(getUserDetails(userId))
			// else (if state's user is correct), fill in form with user details
			} else {
				setUsername(user.name)
				setEmail(user.email)
				setIsAdmin(user.isAdmin)
			}
		}
  }, [dispatch, history, user, userId, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault()
		if (isAdmin) {
			if (window.confirm(`Are you sure you want to set ${user.name} as an admin?`)) {
				dispatch(updateUserAdmin({ _id: userId, name: username, email, isAdmin }))
			} else {
				setIsAdmin(false)
			}
		} else {
			if (window.confirm(`Are you sure you want to take away ${user.name}'s admin status?`)) {
				dispatch(updateUserAdmin({ _id: userId, name: username, email, isAdmin }))
			} else {
				setIsAdmin(true)
			}
		}
  }

  return (
		<>
			<Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link>
			<FormContainer>
				<h1>Edit User</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
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

						<Button type='submit' variant='primary' disabled={isAdmin === user.isAdmin}>Update</Button>
					</Form>
				)}
			</FormContainer>
		</>
  )
}

export default UserEditView
