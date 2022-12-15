import React, { useState, useEffect} from 'react';
import Select from 'react-select';
import { useSelector } from "react-redux";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { COUNTRIES } from '../shared/countries';
import { Card, FormGroup, Label, Input } from 'reactstrap';
import { Form, Field } from "react-final-form";
import { FadeTransform } from 'react-animation-components';
import { Link} from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from 'axios';
import { AvailableWorks, RenderRequest, Proccessing } from '../functionalComponents/functionalComponents';
import Swal from 'sweetalert2';


const API_URL = process.env.REACT_APP_API_URL;
const SUCCESS_URL = process.env.REACT_APP_SUCCESS_URL;
const FAILED_URL = process.env.REACT_APP_FAILED_URL;

const CartCheckoutForm = ({isLoading, clearCart, cartItems, removeFromCart, errMsg, avail1, avail2, avail3, index}) => {

    const [totalAmount, setTotalAmount] = useState(0);
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [region, setRegion] = useState('');
    const [postal_code, setPostal_code] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // console.log(itemSize)

    const countries = COUNTRIES;

    const onSubmit = values => {
        console.log(values);
    }

    const { cart } = useSelector((state) => state);
        useEffect(() => {
            setTotalAmount(cartItems.reduce((acc, curr) => acc + curr.price, 0));
        }, [cartItems]);


    const options = countries.map(country => {
        return (
           {value: country.name, label: country.name, shipping_small: country.shipping_small, shipping_large: country.shipping_large, code: country.code, location: country.location}
        );
    });


    const Total = () => {
        if(selectedOption) {

            return (

                 <>
                {cartItems.length > 1 ? (
                cartItems.reduce((item, index) => {
                    if(selectedOption.location === 'Worldwide' && cartItems[0].size === 'small' && cartItems[1].size === 'small') {
                        return (
                            <p key={index} className='font-two'>€ {item.worldwide_shipping * cartItems.length + totalAmount}</p>
                        );
                    }
                    else if(selectedOption.location === 'Worldwide' && cartItems[0].size === 'large' && cartItems[1].size === 'large') {
                        return (
                            <p key={index} className='font-two'>€ {item.worldwide_shipping * cartItems.length + totalAmount}</p>
                        );
                    }
                    else if(selectedOption.location === 'Worldwide' && cartItems[0].size === 'small' && cartItems[1].size === 'large') {
                        return (
                            <p key={index} className='font-two'>€ {selectedOption.shipping_small + selectedOption.shipping_large + totalAmount}</p>
                        );
                    }
                    else if(selectedOption.location === 'Worldwide' && cartItems[0].size === 'large' && cartItems[1].size === 'small') {
                        return (
                            <p key={index} className='font-two'>€ {selectedOption.shipping_small + selectedOption.shipping_large + totalAmount}</p>
                        );
                    }
                    else if(selectedOption.location === 'EU' && cartItems[0].size === 'small' && cartItems[1].size === 'small') {
                        return (
                            <p key={index} className='font-two'>€ {item.eu_shipping * cartItems.length + totalAmount}</p>
                        );
                    }
                    else if(selectedOption.location === 'EU' && cartItems[0].size === 'large' && cartItems[1].size === 'large') {
                        return (
                            <p key={index} className='font-two'>€ {item.eu_shipping * cartItems.length + totalAmount}</p>
                        );
                    }
                    else if(selectedOption.location === 'EU' && cartItems[0].size === 'small' && cartItems[1].size === 'large') {
                        return (
                            <p key={index} className='font-two'>€ {selectedOption.shipping_small + selectedOption.shipping_large + totalAmount}</p>
                        );
                    }
                    else if(selectedOption.location === 'EU' && cartItems[0].size === 'large' && cartItems[1].size === 'small') {
                        return (
                            <p key={index} className='font-two'>€ {selectedOption.shipping_small + selectedOption.shipping_large + totalAmount}</p>
                        );
                    }
                    else if(selectedOption.location === 'IRL' && cartItems[0].size === 'small' && cartItems[1].size === 'small') {
                        return (
                            <p key={index} className='font-two'>€ {item.irl_shipping * cartItems.length + totalAmount}</p>
                        );
                    }
                    else if(selectedOption.location === 'IRL' && cartItems[0].size === 'large' && cartItems[1].size === 'large') {
                        return (
                            <p key={index} className='font-two'>€ {item.irl_shipping * cartItems.length + totalAmount}</p>
                        );
                    }
                    else if(selectedOption.location === 'IRL' && cartItems[0].size === 'small' && cartItems[1].size === 'large') {
                        return (
                            <p key={index} className='font-two'>€ {selectedOption.shipping_small + selectedOption.shipping_large + totalAmount}</p>
                        );
                    }
                    else if(selectedOption.location === 'IRL' && cartItems[0].size === 'large' && cartItems[1].size === 'small') {
                        return (
                            <p key={index} className='font-two'>€ {selectedOption.shipping_small + selectedOption.shipping_large + totalAmount}</p>
                        );
                    }

                })
                ): cartItems.length <= 1 ? (
                    cartItems.map((item) => {
                        if(item.size === 'small') {
                            return (
                                <p key={index} className='font-two'>€ {selectedOption.shipping_small + totalAmount}</p>
                            );
                        }
                        else if(item.size === 'large') {
                            return (
                                <p key={index} className='font-two'>€ {selectedOption.shipping_large + totalAmount}</p>
                            );
                        }
                    })
                ): (
                    <></>
                )}
                </>
            );
        }
        else {
            return (
                <p></p>
            );
        }
    }

    const OrderTotal = () => {
        if(selectedOption) {
            return (
                <>
                {cartItems.length > 1 ? (
                cartItems.reduce((item, index) => {
                    if(selectedOption.location === 'Worldwide' && cartItems[0].size === 'small' && cartItems[1].size === 'small') {
                        return item.worldwide_shipping * cartItems.length + totalAmount
                    }
                    else if(selectedOption.location === 'Worldwide' && cartItems[0].size === 'large' && cartItems[1].size === 'large') {
                        return item.worldwide_shipping * cartItems.length + totalAmount
                    }
                    else if(selectedOption.location === 'Worldwide' && cartItems[0].size === 'small' && cartItems[1].size === 'large') {
                        return selectedOption.shipping_small + selectedOption.shipping_large + totalAmount

                    }
                    else if(selectedOption.location === 'Worldwide' && cartItems[0].size === 'large' && cartItems[1].size === 'small') {
                        return selectedOption.shipping_small + selectedOption.shipping_large + totalAmount

                    }
                    else if(selectedOption.location === 'EU' && cartItems[0].size === 'small' && cartItems[1].size === 'small') {
                        return item.eu_shipping * cartItems.length + totalAmount
                    }
                    else if(selectedOption.location === 'EU' && cartItems[0].size === 'large' && cartItems[1].size === 'large') {
                        return item.eu_shipping * cartItems.length + totalAmount
                    }
                    else if(selectedOption.location === 'EU' && cartItems[0].size === 'small' && cartItems[1].size === 'large') {
                        return selectedOption.shipping_small + selectedOption.shipping_large + totalAmount

                    }
                    else if(selectedOption.location === 'EU' && cartItems[0].size === 'large' && cartItems[1].size === 'small') {
                        return selectedOption.shipping_small + selectedOption.shipping_large + totalAmount
                    }
                    else if(selectedOption.location === 'IRL' && cartItems[0].size === 'small' && cartItems[1].size === 'small') {
                        return item.irl_shipping * cartItems.length + totalAmount
                    }
                    else if(selectedOption.location === 'IRL' && cartItems[0].size === 'large' && cartItems[1].size === 'large') {
                        return item.irl_shipping * cartItems.length + totalAmount
                    }
                    else if(selectedOption.location === 'IRL' && cartItems[0].size === 'small' && cartItems[1].size === 'large') {
                        return selectedOption.shipping_small + selectedOption.shipping_large + totalAmount
                    }
                    else if(selectedOption.location === 'IRL' && cartItems[0].size === 'large' && cartItems[1].size === 'small') {
                        return selectedOption.shipping_small + selectedOption.shipping_large + totalAmount
                    }

                })
                ) : cartItems.length <= 1 ? (
                        cartItems.map((item) => {
                            if(item.size === 'small') {
                                return selectedOption.shipping_small + totalAmount
                            }
                            else if(item.size === 'large') {
                                return selectedOption.shipping_large + totalAmount
                            }
                        })
                ) : (
                    totalAmount
                )}
                </>
            );
        }
        else {
            return (
                totalAmount
            );
        } 
    }

    const Shipping = () => {
        if(selectedOption) {
            
            return (
                <>
                {cartItems.length > 1 ? (
                cartItems.reduce((item, index) => {
                    if(selectedOption.location === 'Worldwide' && cartItems[0].size === 'small' && cartItems[1].size === 'small') {
                        return (
                            <p key={index} className='font-two'>€ {item.worldwide_shipping * cartItems.length}</p>
                        );
                    }
                    else if(selectedOption.location === 'Worldwide' && cartItems[0].size === 'large' && cartItems[1].size === 'large') {
                        return (
                            <p key={index} className='font-two'>€ {item.worldwide_shipping * cartItems.length}</p>
                        );
                    }
                    else if(selectedOption.location === 'Worldwide' && cartItems[0].size === 'small' && cartItems[1].size === 'large') {
                        return (
                            <p key={index} className='font-two'>€ {selectedOption.shipping_small + selectedOption.shipping_large}</p>
                        );
                    }
                    else if(selectedOption.location === 'Worldwide' && cartItems[0].size === 'large' && cartItems[1].size === 'small') {
                        return (
                            <p key={index} className='font-two'>€ {selectedOption.shipping_small + selectedOption.shipping_large}</p>
                        );
                    }
                    else if(selectedOption.location === 'EU' && cartItems[0].size === 'small' && cartItems[1].size === 'small') {
                        return (
                            <p key={index} className='font-two'>€ {item.eu_shipping * cartItems.length}</p>
                        );
                    }
                    else if(selectedOption.location === 'EU' && cartItems[0].size === 'large' && cartItems[1].size === 'large') {
                        return (
                            <p key={index} className='font-two'>€ {item.eu_shipping * cartItems.length}</p>
                        );
                    }
                    else if(selectedOption.location === 'EU' && cartItems[0].size === 'small' && cartItems[1].size === 'large') {
                        return (
                            <p key={index} className='font-two'>€ {selectedOption.shipping_small + selectedOption.shipping_large}</p>
                        );
                    }
                    else if(selectedOption.location === 'EU' && cartItems[0].size === 'large' && cartItems[1].size === 'small') {
                        return (
                            <p key={index} className='font-two'>€ {selectedOption.shipping_small + selectedOption.shipping_large}</p>
                        );
                    }
                    else if(selectedOption.location === 'IRL' && cartItems[0].size === 'small' && cartItems[1].size === 'small') {
                        return (
                            <p key={index} className='font-two'>€ {item.irl_shipping * cartItems.length}</p>
                        );
                    }
                    else if(selectedOption.location === 'IRL' && cartItems[0].size === 'large' && cartItems[1].size === 'large') {
                        return (
                            <p key={index} className='font-two'>€ {item.irl_shipping * cartItems.length}</p>
                        );
                    }
                    else if(selectedOption.location === 'IRL' && cartItems[0].size === 'small' && cartItems[1].size === 'large') {
                        return (
                            <p key={index} className='font-two'>€ {selectedOption.shipping_small + selectedOption.shipping_large}</p>
                        );
                    }
                    else if(selectedOption.location === 'IRL' && cartItems[0].size === 'large' && cartItems[1].size === 'small') {
                        return (
                            <p key={index} className='font-two'>€ {selectedOption.shipping_small + selectedOption.shipping_large}</p>
                        );
                    }

                })
                ) : cartItems.length <= 1 ? (
                        cartItems.map((item) => {
                            if(item.size === 'small') {
                                return (
                                    <p key={index} className='font-two'>€ {selectedOption.shipping_small}</p>
                                );
                            }
                            else if(item.size === 'large') {
                                return (
                                    <p key={index} className='font-two'>€ {selectedOption.shipping_large}</p>
                                );
                            }
                        })
                ) : (
                    <></>
                )}
                </>
            );
        }
        else {
            return (
                <p></p>
            );
        }
    }

        console.log(OrderTotal())


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
                    postal_code: postal_code,
                    country: selectedOption.value

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

        const { error, paymentMethod} = await stripe.createPaymentMethod({
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
                
                const response = await axios.post(
                    API_URL,
                    {
                        amount: OrderTotal().props.children,
                        id: id,
                        receipt_email: email,
                        cartItems: cartItems,
                        firstname: firstname,
                        lastname: lastname,
                        addressLine1: addressLine1,
                        addressLine2: addressLine2,
                        city: city,
                        region: region,
                        country: selectedOption.value,
                        postal_code: postal_code,
        
                    }
                );

                console.log('Stripe 35 | data', response.data.success);
                if(response.data.success) {
                    console.log('CheckoutForm.js 25| payment successful!')
                    Swal.fire({
                        icon: 'success',
                        title: 'Order Successfully Completed!'
                    });
                    clearCart();
                    removeFromCart();
                    window.location.href = SUCCESS_URL;
                }
                if(error) {
                    console.log(error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Ooops, something went wrong',
                        text: error.text,
                    });
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

        setIsProcessing(false);
        
    };

    const RemoveFromCart = ({removeFromCart, item}) => {
        const { enqueueSnackbar } = useSnackbar();
    
        const handleClick = (e) => {
            e.preventDefault();
            removeFromCart(item);
            enqueueSnackbar(<p className='font-two pt-3'>Item Successfully removed from cart!</p>, {
                variant: 'warning'
            });
        };
    
        return (
            <button className='btn' onClick={handleClick}><span id='trash' className='fa fa-trash fa-lg'></span></button>
        );
    }

    const CartItems = ({cartItem , removeFromCart}) => {

        const cart = cartItem.map((item) => {
      
            return (
                <React.Fragment key={item.id.toString()}>
                    <li>
                        <div className='row py-2'>
                            <div className='col-4'>
                                <img src={item.image} className='img-painting' width='80' height='80' alt={item.image} />
                            </div>
                            <div className='col-6 text-center'>
                                <p className='font'>{item.title}</p>
                                <h5 className='font-two'>€ {item.price}</h5>
                            </div>
                            <div className='col-2'>
                                <RemoveFromCart removeFromCart={removeFromCart} item={item} />
                            </div>
                        </div>
                    </li>
                    <hr></hr>
                </React.Fragment>
            );
        });
            
        return (
            <div className='col-12'>
                <ul className='list-unstyled'>
                    {cart}
                </ul>
            </div>
        );
    }

    const cardElementOptions = {
        style: {
          base: {
            color: "#666",
            fontSize: "16px",
            iconColor: '#663399',
            backgroundColor: '#',
      
          },
          invalid: {
            color: "#fa755a",
            fontSize: "16px",
          }
        }
    }

    return (
        <>
            {cartItems.length > 0 ? (
            <>
                <div key={index} className='checkout-container'>
                    <div className='container py-5'>
                        <div className='row d-flex justify-content-center'>
                            <div className='col-12'>
                                <h4 className='text-center text-white font-two py-3'>Secure payments with <img className="img-fluid stripe-img" src='/assets/images/stripe.png' width='90' height='90' alt='stripe logo' /></h4>
                            </div>
                            <div className='col-12 col-md-6 my-2'>
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
                                                    <div className='col-12 col-lg-6'>
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
                                                <h6 className='font-two text-center py-3'><span className='fa fa-credit-card mr-2'></span><b>Card Details<span className='text-danger'> *</span></b></h6>
                                                <Card className='pay-input p-2'>
                                                    <CardElement options={cardElementOptions} className='my-4'/>
                                                </Card>
                                                {/* <h6 className='font-two text-center py-3'>Billing Information:</h6> */}
                                                {/* <Card className='pay-input p-4 my-2'>
                                                    <AddressElement 
                                                     onChange={(event) => {
                                                        if (event.complete) {
                                                            const address = event.value.address;
                                                            console.log(address);
                                                            localStorage.setItem('address', JSON.stringify(address));
                                                            setAddress({billing_details: {address: {
                                                                city: address.city,
                                                                country: address.country,
                                                                line1: address.line1,
                                                                line2: address.line2,
                                                                postal_code: address.postal_code
                                                            }}});

                                                            if(setAddress.country !== setSelectedOption.value) {
                                                                return alert('Error')
                                                            }
                                                        }
                                                      
                                                        
                                                      }}
                                                    options={{
                                                        mode: 'shipping',
                                                        allowedCountries: ['US', 'CA', 'IE', 'AD', 'AL', 'AT', 'BA', 'BE', 'BG', 'CH', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FO', 'FR', 'GB', 'GR', 'HR', 'HU', 'IC', 'IT', 'LT', 'LU', 'LV', 'MC', 'MD', 'MK', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'SE', 'SI', 'SJ', 'SK', 'SM', 'UA', 'VA'],
                                    
                                                    }} />
                                                </Card>  */}
                                                <h6 className='font-two text-center pt-4'>Billing Information:</h6>
                                                <div className='row'>
                                                    <div className='col-12 pt-2 pb-3'>
                                                        <Select model='.selector'
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
                                                                className='form-control'
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
                                                                className='form-control'
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
                                                                        className='form-control'
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
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12 d-flex justify-content-center'>
                                                {cartItems.length > 2 ? (
                                                    <button disabled type='submit' className='btn btn-primary btn-block font-two px-4 py-2'><span className="fa fa-solid fa-lock fa-lg mr-2"></span></button>
                                                ) : (
                                                    !isProcessing ? (
                                                        <button  data-coreui-timeout="2000" type='submit' className='btn btn-primary btn-block font-two px-4 py-2'><span className="fa fa-solid fa-lock fa-lg mr-2"></span> Pay € <OrderTotal cartItems={cartItems} /></button>
                                                    ) : (
                                                        <button disabled type='submit' className='btn btn-primary btn-block font-two px-4 py-2'>Proccessing... <Proccessing /></button>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </form>
                                )}
                            />
                                </FadeTransform>
                            </div>
                            {cartItems.length > 2 ? (
                                 <div className='col-12 col-md-6 mt-2'>
                                 <div className='payment-card'>
                                     <div className='col-12 text-center pt-2 pb-4'>
                                         <img src='/assets/images/add-to-cart.png' width='65' height='65' alt='cart' />
                                     </div>
                                     <CartItems cartItem={cartItems} removeFromCart={removeFromCart} />
                                     <div className='col-12'>
                                         <Card  className='align-self-center p-3 my-3'>
                                            <p className='text-center font-two text-danger'>Cart items cannot exceed 2 items</p>
                                         </Card>
                                     </div>
                                     {/* <div className='col-12 text-center'>
                                     <button className='btn btn-danger font-two mt-2' onClick={clearCart}>Clear Cart<span className='fa fa-trash ml-2'></span></button>
                                     </div> */}
                                 </div>
                             </div>
                            ) : (
                                <>
                                    <div className='col-12 col-md-6 mt-2'>
                                        <div className='payment-card'>
                                            <div className='col-12 text-center pt-2 pb-4'>
                                                <img src='/assets/images/add-to-cart.png' width='65' height='65' alt='cart' />
                                            </div>
                                            <CartItems cartItem={cartItems} removeFromCart={removeFromCart} />
                                            <div className='col-12'>
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
                                            {/* <div className='col-12 text-center'>
                                            <button className='btn btn-danger font-two mt-2' onClick={clearCart}>Clear Cart<span className='fa fa-trash ml-2'></span></button>
                                            </div> */}
                                        </div>
                                    </div>
                                </>
                            )} 
                        </div>
                    </div>
                </div>
                <div className='row-lt-grey'>
                    <div className='container'>
                        <RenderRequest />
                    </div>
                </div>
            </>
        
            ) : (
            <>
        
                <div className='checkout-container'>
                    <div className='container py-5'>
                        <div className='row d-flex justify-content-center'>
                            <div className='col-12 col-md-8 text-center'>
                                <FadeTransform in
                                transformProps={{
                                exitTransform: 'scale(0.3) translateY(-20%)'
                                }}>
                                <div className='payment-card empty-cart py-5'>
                                    <div className='row align-items-center py-5'>
                                        <div className='col-12'>
                                            <h2 className='font-two py-4'>Your cart is empty!</h2>
                                            <img src='/assets/images/empty-cart.png' width='190' height='190' alt='empty cart' />
                                        </div>
                                        <div className='col-12 text-center py-5'>
                                            <Link to='/gallery/available' className='btn btn-outline-dark'>Browse Gallery</Link>
                                        </div>
                                    </div>
                                </div>
                                </FadeTransform>
                            </div> 
                        </div>
                    </div>
                </div>
                <div className='row row-lt-grey pt-5'>
                    <div className='col-12 text-center'>
                        <h1 className='font py-5'>Available Works</h1>
                    </div>
                    <div className='container container-avail p-5'>
                        <div className='row py-4'>
                            <div className='col-12 text-center text-white pb-5'>
                                <h4 className='py-2 text-grey font-two'>Check out my range of available works.</h4>
                            </div>
                            {/* rendering available works */}
                            <AvailableWorks 
                            item={avail1} 
                            isLoading={isLoading} 
                            errMsg={errMsg}
                            />
                            <AvailableWorks 
                            item={avail2}
                            isLoading={isLoading} 
                            errMsg={errMsg}
                            />
                            <AvailableWorks 
                            item={avail3}
                            isLoading={isLoading} 
                            errMsg={errMsg}
                            />
                        </div>
                        <div className='row pt-5'>
                            <div className='col-12 text-center'>
                                <Link to='/gallery/available' className='btn btn-dark font-two py-2 px-4'>View More<span className='fa fa-chevron-right ml-2'></span></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </>

            )}
        </>
    
    );
};

export default CartCheckoutForm;