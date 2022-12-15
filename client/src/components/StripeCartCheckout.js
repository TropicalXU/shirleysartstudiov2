import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CartCheckoutForm from './CartCheckoutForm';

const PUBLIC_KEY = process.env.REACT_APP_PUBLIC_KEY;

const stripeTestPromise = loadStripe(PUBLIC_KEY);


const StripeCartCheckout = (props) => {

    return (
        <Elements stripe={stripeTestPromise}>
            <CartCheckoutForm 
            cartItems={props.cartItems} 
            clearCart={props.clearCart}
            removeFromCart ={props.removeFromCart} 
            total={props.total}
            avail1={props.available1}
            avail2={props.available2}
            avail3={props.available3}
            isLoading={props.isLoading}
            errMsg={props.errMsg}
            />
        </Elements>
    );
};

export default StripeCartCheckout;