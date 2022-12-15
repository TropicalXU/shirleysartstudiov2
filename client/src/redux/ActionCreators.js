import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';


export const paintingsLoading = () => ({
    type: ActionTypes.PAINTINGS_LOADING
});

export const addPaintings = (paintings) => ({
    type: ActionTypes.ADD_PAINTINGS,
    payload: paintings
});

export const paintingsFailed = (errMsg) => ({
    type: ActionTypes.PAINTINGS_FAILED,
    payload: errMsg
});


export const fetchPaintings = () => (dispatch) => {
    dispatch(paintingsLoading(true));

    return fetch(baseUrl + 'paintings')
    .then(response => {
        if(response.ok) {
            return response;
        }
        else {
            const error = new Error('Error' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        const errMsg = new Error('Error',error);
        throw errMsg;
    })
    .then(response => response.json())
    .then(paintings => dispatch(addPaintings(paintings)))
    .catch(error => dispatch(paintingsFailed(error.message)));
}

export const fetchPaintingsId = () => (dispatch) => {
    dispatch(paintingsLoading(true));

    return fetch(baseUrl + 'paintings/:id')
    .then(response => {
        if(response.ok) {
            return response;
        }
        else {
            const error = new Error('Error' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        const errMsg = new Error('Error',error);
        throw errMsg;
    })
    .then(response => response.json())
    .then(paintings => dispatch(addPaintings(paintings)))
    .catch(error => dispatch(paintingsFailed(error.message)));
}

export const clearCart = () => ({
    type: ActionTypes.CLEAR_CART
});


export const addToCart = (item) => (dispatch, getState) => {
    const cartItems = getState().cart.cartItems.slice();
    let alreadyExists = false;
    cartItems.forEach((p) => {
      if (p.id === item.id) {
        alreadyExists = true;
        p.count++;
      }
    });
    if (!alreadyExists) {
      cartItems.push({ ...item, count: 1 });
    }
    dispatch({
      type: ActionTypes.ADD_TO_CART,
      payload: { cartItems },
    });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const removeFromCart = (item) => (dispatch, getState) => {
    const cartItems = getState()
      .cart.cartItems.slice()
      .filter((p) => p.id !== item.id);
    dispatch({ type: ActionTypes.REMOVE_FROM_CART, payload: { cartItems } });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
};





