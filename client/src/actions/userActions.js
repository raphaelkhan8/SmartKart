import axios from 'axios'
import { ORDER_USER_ORDERS_RESET } from '../constants/orderConstants'
import {  USER_LIST_FAIL, USER_LIST_REQUEST, USER_LIST_SUCCESS, 
  USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_RESET, USER_DETAILS_SUCCESS, 
  USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, 
  USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, 
  USER_UPDATE_PROFILE_FAIL, USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, 
  USER_DELETE_SUCCESS, USER_DELETE_FAIL, USER_DELETE_REQUEST, USER_UPDATE_ADMIN_REQUEST, USER_UPDATE_ADMIN_SUCCESS, USER_UPDATE_ADMIN_FAIL
} from '../constants/userConstants'


// sends dispatch request to server for user info + auth token
export const login = (email, password) => async (dispatch) => {
  try {
    // dispatch login request reducer
    dispatch({
      type: USER_LOGIN_REQUEST
    })

    // config object that will be sent with api request
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }

    // api request to server for user info _ auth token
    const { data } = await axios.post('/api/users/login', { email, password }, config)

    // if data comes back, dispatch user login success reducer and place user info in localStorage
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data))

    // if something goes wrong, dispatch login error reducer
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


// sends dispatch to logout user and reset userDetails and userOrders state 
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
  dispatch({ type: USER_DETAILS_RESET })
  dispatch({ type: ORDER_USER_ORDERS_RESET })
} 


// sends dispatch request to server to save a new user
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    })

    const config = {
      headers: { 'Content-Type': 'application/json' }
    }

    const { data } = await axios.post('/api/users', { name, email, password }, config)

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    })

    // dispatch login success to login new user immediately after succesful registration
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data))

    // if something goes wrong, dispatch login error reducer
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


// sends dispatch request to server to get user's profile info by id
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST
    })

    const { token } = getState().userLogin.userInfo

    const config = {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.get(`/api/users/${id}`, config)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


// sends dispatch request to server to get user's profile info by id
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST
    })

    const { token } = getState().userLogin.userInfo

    const config = {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.put('/api/users/profile', user, config)

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data
    })

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    })

    localStorage.setItem('userInfo', JSON.stringify(data))

  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


// sends dispatch request to server to get all users 
export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST
    })

    const { token } = getState().userLogin.userInfo

    const config = {
      headers: { 
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.get('/api/users', config)

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data
    })

  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


// sends dispatch request to update passed-in user's admin status
export const updateUserAdmin = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_ADMIN_REQUEST
    })

    const { token } = getState().userLogin.userInfo

    const config = {
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }

    const { data } = await axios.put(`/api/users/${user._id}`, user, config)

    dispatch({ type: USER_UPDATE_ADMIN_SUCCESS })
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data })

  } catch (error) {
    dispatch({
      type: USER_UPDATE_ADMIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


// sends dispatch request to delete user with the passed-in id 
export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST
    })

    const { token } = getState().userLogin.userInfo

    const config = {
      headers: { 
        Authorization: `Bearer ${token}`
      }
    }

    await axios.delete(`/api/users/${id}`, config)

    dispatch({ type: USER_DELETE_SUCCESS })

  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}