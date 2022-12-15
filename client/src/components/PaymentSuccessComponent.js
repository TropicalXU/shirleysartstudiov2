import React from 'react';
import { FadeTransform } from 'react-animation-components';


const PaymentSuccess = () => {

    return (
        <>
            <div className='checkout-container'>
                <div className='container py-5'>
                    <div className='row d-flex justify-content-center'>
                        <div className='col-12 col-md-8 text-center'>
                            <FadeTransform in
                            transformProps={{
                            exitTransform: 'scale(0.3) translateY(-20%)'
                            }}>
                            <div className='payment-card py-4'>
                                <div className='row align-items-center text-center py-5'>
                                    <div className='col-12'>
                                        <h2 className='font-two bg-blk text-white py-4 mb-5'>Payment Successful!</h2>
                                    </div>
                                    <div className='col-12 py-4'>
                                        <img src='/assets/images/check.png' width='190' height='190' alt='success' />
                                    </div>
                                    <div className='col-12 py-5'>
                                        <h5 className='font-two gradient-text'>Thank you for shopping your item is on it's way!</h5>
                                    </div>
                                </div>
                            </div>
                            </FadeTransform>
                        </div>
                    </div>
                </div>
            </div>
          
        </>
    );
}

export default PaymentSuccess;