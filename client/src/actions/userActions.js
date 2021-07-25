import axios from 'axios'
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT, 
  USER_REGISTER_FAIL, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS } from '../constants/userConstants'


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

// sends dispatch to logout user 
export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  dispatch({ type: USER_LOGOUT })
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