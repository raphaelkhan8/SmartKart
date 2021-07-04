import { ADD_TO_CART, REMOVE_FROM_CART, GET_CART_SUCCESS, GET_CART_ERROR } from '../constants/cartConstants'

export const userCartReducer = (state = { cartItems: [] }, action) => {
  switch(action.type){
    case ADD_TO_CART:
      const item = action.payload
      const itemAlreadyInCart = state.cartItems.find(n => n.product === item.product)
      if (itemAlreadyInCart) {
        return {
          ...state, 
          cartItems: state.cartItems.map(n => n.product === itemAlreadyInCart.product ? item: n)
        }
      } else {
        return {
          ...state, 
          cartItems: [...state.cartItems, item]
        }
      }
    case REMOVE_FROM_CART:
      return{
        error: action.payload
      }
    case GET_CART_SUCCESS:
      return {
        cart: action.payload
      }
    case GET_CART_ERROR:
      return{
        error: action.payload
      }
    default: 
      return state
  }
}