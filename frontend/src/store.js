import { createStore, combineReducers, applyMiddleware } from "redux";
import  { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { cartReducer } from "./reducers/cartReducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderMyListReducer,
  orderListReducer,
  orderDeliverReducer,
  orderCancelReducer,
  orderAnalysisReducer,
} from "./reducers/orderReducer";
import { 
  productListReducer, 
  productDetailsReducer,
  productDeleteReducer, 
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productAnalysisReducer,
} from "./reducers/productReducer";
import { 
  userLoginReducer, 
  userRegisterReducer ,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer
} from "./reducers/userReducer";



const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productAnalysis: productAnalysisReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails : userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMyList: orderMyListReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
    orderCancel: orderCancelReducer,
    orderAnalysis: orderAnalysisReducer,

    
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem('cartItems'))
   : [];


const userInfoFromStorage = localStorage.getItem("userInfo")
 ? JSON.parse(localStorage.getItem("userInfo"))
  : null;


const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
 ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethodFromStorage = localStorage.getItem("paymentMethod")
 ? JSON.parse(localStorage.getItem("paymentMethod"))
  : 'paypal';



const initialState = {
  cart: { 
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage, 
    paymentMethod: paymentMethodFromStorage,

  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;