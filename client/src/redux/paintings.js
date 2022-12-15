import * as ActionTypes from './ActionTypes';

export const Paintings = (state = {
    isLoading: true,
    errMsg: null,
    paintings: []
}, action) => {
    switch(action.type) {
        case ActionTypes.ADD_PAINTINGS:
        return {...state, isLoading: false, errMsg: null, paintings: action.payload }

        case ActionTypes.PAINTINGS_LOADING:
        return {...state, isLoading: true, errMsg: null, paintings: []}

        case ActionTypes.PAINTINGS_FAILED:
            return {...state, isLoading: false, errMsg: action.payload, paintings: []}

        default:
            return state;
    }
}