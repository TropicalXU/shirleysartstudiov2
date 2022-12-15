import React, { useState} from 'react';
import Select from 'react-select';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { COUNTRIES } from '../shared/countries';
import { Card, FormGroup, Label, Input } from 'reactstrap';
import { Form, Field } from "react-final-form";
import { FadeTransform } from 'react-animation-components';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { RenderRequest, Proccessing } from '../functionalComponents/functionalComponents';
import Swal from 'sweetalert2';
import { Loading } from './LoadingComponent';

const API_URL = process.env.REACT_APP_API_URL;
const SUCCESS_URL = process.env.REACT_APP_SUCCESS_URL;
const FAILED_URL = process.env.REACT_APP_FAILED_URL;

export const CheckoutForm = ({paintings, resetFeedbackForm, avail1, avail2, avail3, isLoading, errMsg}) => {

    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [postal_code, setPostal_code] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const countries = COUNTRIES;

    const onSubmit = values => {
        console.log(values);
    }

    const options = countries.map(country => {
        return (
           {value: country.name, label: country.name, shipping_small: country.shipping_small, shipping_large: country.shipping_large, code: country.code}
        );
    });


    const Total = () => {
        if(selectedOption) {
            if(paintings.size === 'small') {
                return (
                    <p className='font-two'>€ {selectedOption.shipping_small + paintings.price}</p>
                );
            }
            else if(paintings.size === 'large') {
                return (
                    <p className='font-two'>€ {selectedOption.shipping_large + paintings.price}</p>
                );
            }
        }
        else {
            return (
                <p></p>
            );
        }
    }

    const OrderTotal = () => {
        if(selectedOption) {
            if(paintings.size === 'small') {
                return (
                    selectedOption.shipping_small + paintings.price
                );
            }
            else if(paintings.size === 'large') {
                return (
                    selectedOption.shipping_large + paintings.price
                 );
            }
        }
        else {
            return (
                paintings.price
            );
        }
    }


    const Shipping = () => {
        if(selectedOption) {
            if(paintings.size === 'small') {
                return (
                    <p className='font-two'>€ {selectedOption.shipping_small}</p>
                );
            }
            else if(paintings.size === 'large') {
                return (
                    <p className='font-two'>€ {selectedOption.shipping_large}</p>
                );
            }

        }
        else {
            return (
                <p></p>
            );
        }
    }

    const TotalAmount = () => {
        if(selectedOption) {
            if(paintings.size === 'small') {
                return selectedOption.shipping_small + paintings.price;
            }
            else if(paintings.size === 'large') {
                return selectedOption.shipping_large + paintings.price;
            }
        }
        else return new Error(alert('Sorry something went wrong!'));
    }

    const stripe = useStripe();
    const elements = useElements();
    

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsProcessing(true);

        try {
            let res = await fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify({
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    addressLine1: addressLine1,
                    addressLine2: addressLine2,
                    city: city,
                    region: region,
                    postal_code: postal_code

                }),
                headers: {
                    'Content-Type' : 'application.json'
                },
                credentials: 'same-origin'
            })
            .then(response => {
                if(response.ok) {
                    return response;
                }
                else {
                    const error = new Error('Error' + response.status)
                    error.response = response;
                }
            },
            error => {
                let errMsg = new Error(error.message);
                throw errMsg;
            })
            .then(response => response.json())
            .catch(error => {
                console.log('Error', error.message);
            })

            let resJson = await res.json();

            if(res.status === 200) {
                setFirstName('');
                setLastName('');
                setEmail('');
                setAddressLine1('');
                setAddressLine2('');
                setCity('');
                setRegion('');
                setPostal_code('');
            } 
        } catch(err) {
            console.log(err)
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: {
                address: {
                    line1: addressLine1,
                    line2: addressLine2,
                    city: city,
                    country: selectedOption.code,
                    postal_code: postal_code
                },
                email: email,
                name: firstname + '' + lastname
            }
        });

        if(!error) {
            console.log('Stripe 23 | token generated!', paymentMethod);
            //send token to backend here
            try {
                const { id } = paymentMethod;
                const _id = paintings.id;
                const response = await axios.post(
                    API_URL,
                    {
                        amount: TotalAmount(),
                        id: id,
                        receipt_email: email,
                        _id: _id,
                   
                    }
                );

                console.log('Stripe 35 | data', response.data.success);
                if(response.data.success) {
                    console.log('CheckoutForm.js 25| payment successful!'); 
                    Swal.fire({
                        icon: 'success',
                        title: 'Order Successfully Completed!'
                    });
                    window.location.href = SUCCESS_URL;
                  
                 
                }
                if(error) {
                    console.log(error);
                    window.location.href = FAILED_URL;
                }
            }
            catch(error) {
                console.log('CheckoutForm.js 28 | ', error);
            }
        }
        else {
            console.log(error.message);
        }
        resetFeedbackForm()
    };

    const cardElementOptions = {
        style: {
          base: {
            color: "#666",
            fontSize: "16px",
          },
          invalid: {
            color: "#fa755a",
            fontSize: "16px",
          }
        }
    }

    if(isLoading) {
        return (
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        );
    }
    else if(errMsg) {
        return(
            <div className='container py-5'>
                <div className='row d-flex justify-content-center py-5'>
                    <div className='col-12 col-md-8'>
                        <div className='error-card'>
                            <div className='col-12 text-center'>
                                <img src='/assets/images/error.png' width='220' height='220' alt='error message' />
                                <h4 className='font-two'>{errMsg}</h4>
                                <h2 className='font-two py-5'>Sorry something went wrong!</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else


    return (
        <>
            <div className='checkout-container'>
                <div className='container py-5'>
                    <NavLink to={`/gallery/${paintings.id}`} className='font-two text-white'><span className='fa fa-chevron-left fa-lg mr-2'></span></NavLink>
                    <div className='row'>
                        <div className='col-12 py-3'>
                            <h4 className='text-center text-white font-two py-3'>Secure payments with <img className="img-fluid stripe-img" src='/assets/images/stripe.png' width='90' height='90' alt='stripe logo' /></h4>
                        </div>
                    </div>
                    <div className='row d-flex justify-content-center'>
                        <div className='col-12 col-lg-6 my-2'>
                            <FadeTransform in
                            transformProps={{
                            exitTransform: 'scale(0.3) translateY(-20%)'
                            }}>
                            <Form onSubmit={onSubmit}
                                validate={values => {
                                    const errors = {};
                                    function validateEmail(email) {
                                       let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                       return reg.test(String(email).toLocaleLowerCase());
                                    }
                                    if(!firstname) {
                                        errors.firstname = 'Required!';
                                    }  
                                    if(!lastname) {
                                        errors.lastname = 'Required!';
                                    }
                                    if(!email) {
                                        errors.email = 'Required!';
                                    } else if(!validateEmail(email)) {
                                        errors.email = 'Not a valid email address!'
                                    }
                                    if(!addressLine1) {
                                        errors.addressLine1 = 'Required!';
                                    }
                                    if(!addressLine2) {
                                        errors.addressLine2 = 'Required!';
                                    }
                                    if(!city) {
                                        errors.city = 'Required!';
                                    }
                                    if(!region) {
                                        errors.region = 'Required';
                                    }
                                    if(!postal_code) {
                                        errors.postal_code = 'Required';
                                    }
                                    return errors;
                                }}
                                render={({ values, valid}) => (
                                    <form model='feedback' className='card payment-card font-two px-5' id='payment-form' onSubmit={handleSubmit} style={{ maxWidth: 900 }} method='POST'>
                                        <div className='row py-2'>
                                            <div className='col-12 py-4'>
                                                <div className='row'>
                                                    <div className='col-12 col-md-6'>
                                                        <FormGroup>
                                                            <Label htmlFor='firstname'><span className='fa fa-user mr-2'></span><b>First Name<span className='text-danger'> *</span></b></Label>  
                                                            <Field name='firstname'>
                                                                {({ input, meta}) => (
                                                                    <div>
                                                                        <Input 
                                                                        {...input}
                                                                        type='text'
                                                                        value={firstname} id='firstname' name='firstname'
                                                                        className='form-control pay-input p-4'
                                                                        placeholder='First Name' 
                                                                        onChange={(e) => setFirstName(e.target.value)}
                                                                        invalid={meta.error && meta.touched}
                                                                        required
                                                                        /> 
                                                                        <div className='my-1'>
                                                                            {meta.error && meta.touched && <span className='text-danger small-text'>{meta.error}</span>}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Field>
                                                        </FormGroup>
                                                    </div>
                                                    <div className='col-12 col-md-6'>
                                                        <FormGroup>
                                                            <Label htmlFor='lastname'><span className='fa fa-user mr-2'></span><b>Last Name<span className='text-danger'> *</span></b></Label>  
                                                            <Field name='lastname'>
                                                                {({ input, meta }) => (
                                                                    <div>
                                                                        <Input 
                                                                        {...input}
                                                                        value={lastname} id='lastname' name='lastname' 
                                                                        type='text'
                                                                        className='form-control pay-input p-4'
                                                                        placeholder='Last Name' 
                                                                        onChange={(e) => setLastName(e.target.value)}
                                                                        invalid={meta.error && meta.touched}
                                                                        required
                                                                        />
                                                                        <div className='my-1'>
                                                                            {meta.error && meta.touched && <span className='text-danger small-text'>{meta.error}</span>}
                                                                        </div>
                                                                    </div>
                                                                )} 
                                                            </Field>
                                                        </FormGroup>
                                                    </div>
                                                </div>
                                                <FormGroup>
                                                    <Label htmlFor='email'><span className='fa fa-envelope mr-2'></span><b>Email<span className='text-danger'> *</span></b></Label>  
                                                    <Field name='email'>
                                                        {({ input, meta }) => (
                                                            <div>
                                                                <Input
                                                                {...input} 
                                                                value={email} id='email' name='email' 
                                                                type='text'
                                                                className='form-control pay-input p-4'
                                                                placeholder='@email.com' 
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                invalid={meta.error && meta.touched}
                                                                required
                                                                /> 
                                                                <div className='my-1'>
                                                                    {meta.error && meta.touched && <span className='text-danger small-text'>{meta.error}</span>}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Field>
                                                </FormGroup>
                                                <h6 className='font-two text-center py-2'><span className='fa fa-credit-card mr-2'></span><b>Card Details<span className='text-danger'> *</span></b></h6>
                                                <Card className='pay-input p-2'>
                                                    <CardElement options={cardElementOptions} className='my-4'/>
                                                </Card>
                                                <h6 className='font-two text-center pt-4'><b>Billing Information:<span className='text-danger'> *</span></b></h6>
                                                <div className='row'>
                                                    <div className='col-12 pt-2 pb-3'>
                                                        <Select 
                                                            defaultValue={selectedOption}
                                                            onChange={setSelectedOption}
                                                            options={options}
                                                            placeholder='Select Country...' 
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <FormGroup>
                                                    <Field name='addressLine1'>
                                                        {({ input, meta }) => (
                                                            <div>
                                                                <Input 
                                                                {...input}
                                                                value={addressLine1} id='addressLine1' name='addressLine1' type='text'
                                                                className='form-control pay-input p-4'
                                                                placeholder='Address Line 1' 
                                                                onChange={(e) => setAddressLine1(e.target.value)}
                                                                invalid={meta.error && meta.touched}
                                                                required
                                                                /> 
                                                                <div className='my-1'>
                                                                    {meta.error && meta.touched && <span className='text-danger small-text'>{meta.error}</span>} 
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Field>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Field name='addressLine2'>
                                                        {({ input, meta }) => (
                                                            <div>
                                                                <Input
                                                                {...input} 
                                                                value={addressLine2} id='addressLine2' name='addressLine2' type='text'
                                                                className='form-control pay-input p-4'
                                                                placeholder='Address Line 2' 
                                                                onChange={(e) => setAddressLine2(e.target.value)}
                                                                invalid={meta.error && meta.touched}
                                                                required
                                                                /> 
                                                                <div className='my-1'>
                                                                    {meta.error && meta.touched && <span className='text-danger small-text'>{meta.error}</span>} 
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Field>
                                                </FormGroup>
                                                <div className='row'>
                                                    <div className='col-12 col-md-4'>
                                                        <FormGroup>
                                                            <Field name='city'>
                                                                {({ input, meta }) => (
                                                                    <div>
                                                                        <Input 
                                                                        {...input}
                                                                        value={city} id='city' name='city' type='text'
                                                                        className='form-control pay-input p-4'
                                                                        placeholder='City'
                                                                        onChange={(e) => setCity(e.target.value)}
                                                                        invalid={meta.error && meta.touched}
                                                                        required
                                                                        />
                                                                        <div className='my-1'>
                                                                            {meta.error && meta.touched && <span className='text-danger small-text'>{meta.error}</span>} 
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Field>
                                                        </FormGroup>
                                                    </div>
                                                    <div className='col-12 col-md-4'>
                                                        <FormGroup>
                                                            <Field name='region'>
                                                                {({ input, meta }) => (
                                                                    <div>
                                                                        <Input 
                                                                        {...input}
                                                                        value={region} id='region' name='region' type='region'
                                                                        className='form-control'
                                                                        placeholder={selectedOption === null ? 'Region' : selectedOption.code === 'IE' ? 'County' : selectedOption.code === 'US' ? 'State' : selectedOption.code === 'CA' ? 'Province' : 'Region'}
                                                                        onChange={(e) => setRegion(e.target.value)}
                                                                        invalid={meta.error && meta.touched}
                                                                        required
                                                                        />
                                                                        <div className='my-1'>
                                                                            {meta.error && meta.touched && <span className='text-danger small-text'>{meta.error}</span>} 
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </Field>
                                                        </FormGroup>
                                                    </div>
                                                    <div className='col-12 col-md-4'>
                                                        <Field name='postal_code'>
                                                            {({ input, meta }) => (
                                                                <div>
                                                                    <Input 
                                                                    {...input}
                                                                    value={postal_code} id='postal_code' name='postal_code' type='postal_code'
                                                                    className='form-control'
                                                                    placeholder={selectedOption === null ? 'Postal Code' : selectedOption.code === 'IE' ? 'EireCode' : selectedOption.code === 'US' ? 'Zip Code' : selectedOption.code === 'GB' ? 'Postcode' : 'Postal Code' }
                                                                    onChange={(e) => setPostal_code(e.target.value)}
                                                                    invalid={meta.error && meta.touched}
                                                                    required
                                                                    />
                                                                    <div className='my-1'>
                                                                        {meta.error && meta.touched && <span className='text-danger small-text'>{meta.error}</span>} 
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Field>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-12 d-flex justify-content-center mt-3'>
                                                    {!isProcessing ? (
                                                        <button  data-coreui-timeout="2000" type='submit' className='btn btn-primary btn-block font-two px-4 py-2'><span className="fa fa-solid fa-lock fa-lg mr-2"></span> Pay € <OrderTotal /></button>
                                                    ) : (
                                                        <button disabled type='submit' className='btn btn-primary btn-block font-two px-4 py-2'>Proccessing... <Proccessing /></button>
                                                    )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                )} 
                            />   
                              </FadeTransform>
                        </div>
                        <div className='col-12 col-lg-6 mt-2'>
                            <div className='payment-card'>
                                <div className='row py-2'>
                                    <div className='col-12 text-center pt-2 pb-4'>
                                        <img src='/assets/images/order.png' width='65' height='65' alt='cart' />
                                    </div>
                                    <div className='col-3 py-4'>
                                        <img src={paintings.image} className='img-painting' width='90px' height='90px' alt='available painting' /> 
                                    </div>  
                                    <div className='col-6 align-self-center py-4'>
                                        <p className='font'>{paintings.title}</p>
                                    </div>
                                    <div className='col-3 align-self-center py-4'>
                                        <h5 className='font-two'>€ {paintings.price}</h5>
                                    </div> 
                                </div>
                                <hr></hr>
                                <Card  className='pay-input p-3 my-3'>
                                    <h6 className='text-center font-two'>Order Information:</h6>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <p className='font-two'>Shipping:</p>
                                        </div>
                                        <div className='col-6 text-center'>
                                            <Shipping />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-6'>
                                            <p className='font-two'>Total:</p>
                                        </div>
                                        <div className='col-6 text-center'>
                                            <Total />
                                        </div>
                                    </div>
                                    <p className='text-center tax'>Tax is included in the price.</p>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row-lt-grey'>
                <div className='container'>
                    <RenderRequest />
                </div>
            </div>
        </>
    );
};

export default CheckoutForm;