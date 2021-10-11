import { ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_ERROR } from '../constants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
  switch(action.type) {
		case ORDER_CREATE_REQUEST:
			return { loading: true }
		case ORDER_CREATE_SUCCESS:
			return { loading: false, success: true, order: action.paylod }
		case ORDER_CREATE_ERROR:
			return { loading: false, error: action.paylod }
		default: 
			return state
	}
}