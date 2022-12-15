import {createStore, combineReducers, applyMiddleware} from 'redux';
import { createForms } from 'react-redux-form';
import { Paintings } from './paintings';
import { Cart } from './cart';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { InitialFeedback } from './forms';

export const ConfigureStore = () => {

    const store = createStore(
        combineReducers({
            paintings: Paintings,
            cart: Cart,
            ...createForms({
                feedback: InitialFeedback//next step is to go to MainComponent and import {actions} from react-redux-form
            })
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}