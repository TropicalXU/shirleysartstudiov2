import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import CheckoutForm from './CheckoutForm';

const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY;

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = (props) => {

    return (
        <Elements stripe={stripeTestPromise}>
            <CheckoutForm 
                paintings={props.painting} 
                cart={props.cartItems}
                avail1={props.available1}
                avail2={props.available2}
                avail3={props.available3}
                isLoading={props.isLoading}
                errMsg={props.errMsg}
                resetFeedbackForm={props.resetFeedbackForm} 
            />
        </Elements>
    );
};

export default Stripe;
