import axios from 'axios'
import { ADD_TO_CART, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS, REMOVE_FROM_CART } from '../constants/cartConstants'


export const addToCart = (id, quantity) => 
  async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
      type: ADD_TO_CART,
      payload: {
        id: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        quantity,
      },
    })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const removeFromCart = (id) => 
  async (dispatch, getState) => {

    dispatch({
      type: REMOVE_FROM_CART,
      payload: id
    })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const saveShippingAddress = (data) => (dispatch) => {

    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data
    })

  localStorage.setItem('shippingAddress', JSON.stringify(data))
}


export const savePaymentMethod = (data) => (dispatch) => {

    dispatch({
      type: CART_SAVE_PAYMENT_METHOD,
      payload: data
    })

  localStorage.setItem('paymentMethod', JSON.stringify(data))
}