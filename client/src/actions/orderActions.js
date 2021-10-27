import axios from 'axios'
import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_ERROR } from '../constants/orderConstants'

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