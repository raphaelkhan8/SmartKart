import axios from 'axios'
import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_ERROR, 
	ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_ERROR } from '../constants/orderConstants'

// sends dispatch request to server to save order
export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_CREATE_REQUEST
		})

		const { token } = getState().userLogin.userInfo

		const config = {
			headers: { 
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		}

		const { data } = await axios.post('/api/orders', order, config)

		dispatch({
			type: ORDER_CREATE_SUCCESS,
			payload: data
		})

	} catch (error) {
		dispatch({
			type: ORDER_CREATE_ERROR,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		})
	}
}


// sends dispatch request to server to get order by id
export const getOrderDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_DETAILS_REQUEST
		})

		const { token } = getState().userLogin.userInfo

		const config = {
			headers: { 
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		}

		const { data } = await axios.get(`/api/orders/${id}`, config)

		dispatch({
			type: ORDER_DETAILS_SUCCESS,
			payload: data
		})

	} catch (error) {
		dispatch({
			type: ORDER_DETAILS_ERROR,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		})
	}
}