import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_ERROR,
	ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_ERROR, 
	ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_ERROR, ORDER_PAY_RESET,
	ORDER_USER_ORDERS_REQUEST, ORDER_USER_ORDERS_SUCCESS, ORDER_USER_ORDERS_ERROR, ORDER_USER_ORDERS_RESET, 
	ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_ERROR 
} from '../constants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
  switch(action.type) {
		case ORDER_CREATE_REQUEST:
			return { loading: true }
		case ORDER_CREATE_SUCCESS:
			return { loading: false, success: true, order: action.payload }
		case ORDER_CREATE_ERROR:
			return { loading: false, error: action.payload }
		default: 
			return state
	}
}

export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
	switch(action.type) {
		case ORDER_DETAILS_REQUEST: 
			return { ...state, loading: true }
		case ORDER_DETAILS_SUCCESS:
			return { loading: false, order: action.payload }
		case ORDER_DETAILS_ERROR:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const orderPaidReducer = (state = {}, action) => {
	switch(action.type) {
		case ORDER_PAY_REQUEST: 
			return { loading: true }
		case ORDER_PAY_SUCCESS:
			return { loading: false, success: true }
		case ORDER_PAY_ERROR:
			return { loading: false, error: action.payload }
		case ORDER_PAY_RESET:
			return { }
		default:
			return state
	}
}

export const userOrdersReducer = (state = { orders: [] }, action) => {
	switch(action.type) {
		case ORDER_USER_ORDERS_REQUEST: 
			return { ...state, loading: true }
		case ORDER_USER_ORDERS_SUCCESS:
			return { loading: false, orders: action.payload }
		case ORDER_USER_ORDERS_ERROR:
			return { loading: false, error: action.payload }
		case ORDER_USER_ORDERS_RESET:
			return { order: [] }
		default:
			return state
	}
}

export const orderListReducer = (state = { orders: [] }, action) => {
	switch(action.type) {
		case ORDER_LIST_REQUEST: 
			return { ...state, loading: true }
		case ORDER_LIST_SUCCESS:
			return { loading: false, orders: action.payload }
		case ORDER_LIST_ERROR:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}