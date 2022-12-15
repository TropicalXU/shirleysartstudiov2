import * as ActionTypes from './ActionTypes';

export const Cart = (
    state = { 
        cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]"),
        isPaymentLoading: true
    },
    action
  ) => {
    switch (action.type) {
      case ActionTypes.ADD_TO_CART:
        return { cartItems: action.payload.cartItems };
      case ActionTypes.REMOVE_FROM_CART:
        return { cartItems: action.payload.cartItems };

      case ActionTypes.CLEAR_CART:
        return { 
          ...state,
          cartItems: [] };


        default:
        return state;
    }
  };