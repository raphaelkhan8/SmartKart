import React, { useState, useEffect } from 'react'
import { Button, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers } from '../actions/userActions'

const UserListView = ({ history }) => {

  const dispatch = useDispatch()

  const userList = useSelector(state => state.userList)
  const { loading, error, users } = userList

  // redirect to home if login page if users is not logged-in
  useEffect(() => {
    dispatch(listUsers())
  }, [dispatch])


  return (
    <div>
      <h1>Users List</h1>
    </div>
	)
}

export default UserListView