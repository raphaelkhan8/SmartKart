import axios from 'axios'
import { CART_RESET } from '../constants/cartConstants'
import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_ERROR, 
	ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_ERROR, 
	ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_ERROR, 
	ORDER_USER_ORDERS_REQUEST, ORDER_USER_ORDERS_SUCCESS, ORDER_USER_ORDERS_ERROR,
	ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_ERROR 
} from '../constants/orderConstants'

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

		dispatch({ type: CART_RESET })

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


// sends dispatch request to get order paid through Paypal API
export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_PAY_REQUEST
		})

		const { token } = getState().userLogin.userInfo

		const config = {
			headers: { 
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		}

		const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)

		dispatch({
			type: ORDER_PAY_SUCCESS,
			payload: data
		})

	} catch (error) {
		dispatch({
			type: ORDER_PAY_ERROR,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		})
	}
}


// sends dispatch request to get user's orders
export const getUserOrders = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_USER_ORDERS_REQUEST
		})

		const { token } = getState().userLogin.userInfo

		const config = {
			headers: { 
				Authorization: `Bearer ${token}`
			}
		}

		const { data } = await axios.get(`/api/orders/myorders`, config)

		dispatch({
			type: ORDER_USER_ORDERS_SUCCESS,
			payload: data
		})

	} catch (error) {
		dispatch({
			type: ORDER_USER_ORDERS_ERROR,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		})
	}
}


// sends dispatch request to get all orders
export const getAllOrders = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: ORDER_LIST_REQUEST
		})

		const { token } = getState().userLogin.userInfo

		const config = {
			headers: { 
				Authorization: `Bearer ${token}`
			}
		}

		const { data } = await axios.get(`/api/orders`, config)

		dispatch({
			type: ORDER_LIST_SUCCESS,
			payload: data
		})

	} catch (error) {
		dispatch({
			type: ORDER_LIST_ERROR,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		})
	}
}