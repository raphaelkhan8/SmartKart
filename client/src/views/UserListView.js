import React, { useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'

const UserListView = ({ history }) => {

  const dispatch = useDispatch()

  const userList = useSelector(state => state.userList)
  const { loading, error, users } = userList

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	const { success:successDelete } = useSelector(state => state.userDelete)

  // only send dispatch if user is logged-in and an admin
  useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers())
		} else {
			history.push('/login')
		}
  }, [dispatch, history, userInfo, successDelete])
	

	const deleteUserHandler = (userId) => {
		if (window.confirm('Are you sure you want to delete this user?')) {
			dispatch(deleteUser(userId))
		}
	}


  return (
    <div>
      <h1>Users</h1>
			{loading ? <Loader /> : users ?
			(<Table striped bordered hover responsive className='table-sm'>
				<thead>
					<tr>
						<th>ID</th>
						<th>NAME</th>
						<th>EMAIL</th>
						<th>ADMIN</th>
						<th>UPDATE</th>
					</tr>
				</thead>
				<tbody>
					{users.map(user => (
						<tr key={user._id}>
							<td>{user._id}</td>
							<td>{user.name}</td>
							<td><a href={`mailto:${user.email}`}></a>{user.email}</td>
							<td>
								{user.isAdmin ? (<i className='fas fa-check' style={{ color: 'green' }}></i>) : 
									(<i className='fas fa-times' style={{ color: 'red' }}/>)}
							</td>
							<td>
								<LinkContainer to={`/user/${user._id}/edit`}>
									<Button variant='light' className='btn-sm'>
										<i className='fas fa-edit'></i>
									</Button>
								</LinkContainer>
								<Button variant='danger' className='btn-sm' onClick={() => deleteUserHandler(user._id)}>
									<i className='fas fa-trash'></i>
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</Table>) 
			: <Message variant='danger'>{error}</Message>}
    </div>
	)
}

export default UserListView