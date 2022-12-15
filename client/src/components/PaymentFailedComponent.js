import React from 'react';
import { FadeTransform } from 'react-animation-components';


const PaymentFailed = () => {

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
                                        <h2 className='font-two text-danger grey-bg py-4 mb-5'>Payment Failed!</h2>
                                    </div>
                                    <div className='col-12 py-4'>
                                        <img src='/assets/images/failed.png' width='190' height='190' alt='empty cart' />
                                    </div>
                                    <div className='col-12 text-center py-4'>
                                        <h5 className='font-two gradient-text pt-3'>Your payment was not accepted. Please try again!</h5>
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

export default PaymentFailed;