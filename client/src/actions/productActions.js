import axios from 'axios'
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from '../constants/productConstants'

export const listProducts = () => async (dispatch) => {
  try {
    // dispatch request to server for products
    dispatch({ type: PRODUCT_LIST_REQUEST })
    const { data } = await axios.get('/api/products')
    // dispatch to add products to state upon successful return of data
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
  } catch (error) {
    // dispatch to return error if retrieval fails
    dispatch({ 
      type: PRODUCT_LIST_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}