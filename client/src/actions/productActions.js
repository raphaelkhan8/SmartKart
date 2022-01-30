import axios from 'axios'
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL,
         PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, 
         PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, 
         PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL,
		 PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL,
		 PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAIL
       } from '../constants/productConstants'


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


export const listProductDetails = (id) => async (dispatch) => {
  try {
    // dispatch request to server for product by id
    dispatch({ type: PRODUCT_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/products/${id}`)
    // dispatch to add product to state upon successful return of data
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    // dispatch to return error if retrieval fails
    dispatch({ 
      type: PRODUCT_DETAILS_FAIL, 
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
  }
}


// sends dispatch request to delete product with the passed-in id
export const deleteProduct = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_DELETE_REQUEST
		})

		const { token } = getState().userLogin.userInfo

		const config = {
			headers: { 
				Authorization: `Bearer ${token}`
			}
		}

		await axios.delete(`/api/products/${id}`, config)

		dispatch({
			type: PRODUCT_DELETE_SUCCESS
		})

	} catch (error) {
		dispatch({
			type: PRODUCT_DELETE_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		})
	}
}


// sends dispatch request to create sample product
export const createProduct = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_CREATE_REQUEST
		})

		const { token } = getState().userLogin.userInfo

		const config = {
			headers: { 
				Authorization: `Bearer ${token}`
			}
		}

		const { data } = await axios.post(`/api/products`, {}, config)

		dispatch({
			type: PRODUCT_CREATE_SUCCESS,
      payload: data
		})

	} catch (error) {
		dispatch({
			type: PRODUCT_CREATE_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		})
	}
}


// sends dispatch request to update product with data from the passed-in product object
export const updateProduct = (product) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_UPDATE_REQUEST
		})

		const { token } = getState().userLogin.userInfo

		const config = {
			headers: { 
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		}

		const { data } = await axios.put(`/api/products/${product._id}`, product, config)

		dispatch({
			type: PRODUCT_UPDATE_SUCCESS,
      payload: data
		})

	} catch (error) {
		dispatch({
			type: PRODUCT_UPDATE_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		})
	}
}


// sends dispatch request to create review on product
export const createProductReview = (productId, review) => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_CREATE_REVIEW_REQUEST
		})

		const { token } = getState().userLogin.userInfo

		const config = {
			headers: { 
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`
			}
		}

		await axios.post(`/api/products/${productId}/reviews`, review, config)

		dispatch({
			type: PRODUCT_CREATE_REVIEW_SUCCESS,
		})

	} catch (error) {
		dispatch({
			type: PRODUCT_CREATE_REVIEW_FAIL,
			payload: error.response && error.response.data.message ? error.response.data.message : error.message
		})
	}
}