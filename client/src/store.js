import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { productListReducer, productDetailsReducer, productDeleteReducer, productCreateReducer, productUpdateReducer, productCreateReviewReducer, productTopRatedReducer } from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { orderCreateReducer, orderDetailsReducer, orderPaidReducer, userOrdersReducer, orderListReducer, orderDeliverReducer } from './reducers/orderReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer, 
         userListReducer, userDeleteReducer, userUpdateAdminReducer } from './reducers/userReducers'

const reducers = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productCreateReview: productCreateReviewReducer,
  productTopRated: productTopRatedReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userOrders: userOrdersReducer,
  userList: userListReducer,
  userUpdateAdmin: userUpdateAdminReducer,
  userDelete: userDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPaid: orderPaidReducer,
  orderDeliver: orderDeliverReducer,
  orderList: orderListReducer,
  cart: cartReducer,
})

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')): []

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')): null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')): {}

const initialState = {
  cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage },
  userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store