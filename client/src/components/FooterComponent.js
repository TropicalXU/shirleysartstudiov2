//importing main links
import React from "react";
import { Link } from 'react-router-dom';

const URL = process.env.REACT_APP_LAYERLABS_URL;

function validateURL(url) {
    const parsed = new URL(url)
    return ['https:', 'http:'].includes(parsed.protocol)
}

const Footer = () => {
    return (
          //FOOTER COMPONENT--------------//
            <div className='footer font-two pt-4'>
                <div className='container-fluid mx-4 py-5'>
                    <div className='row py-5 mb-5'>
                        <div className='col-12 col-lg-4 py-5'>
                            <div className='row brand-logo'>
                                <img src='/assets/images/logo2.png' alt='Logo' height='60' width='61' />
                                <h4 className='navbrand px-3 pt-3 ml-2'>Shirleys Art Studio</h4>
                            </div>
                        </div>
                        <div className='col-6 col-lg-2 pt-5'>
                            <h5 className='font-two'>Site</h5>
                            <ul className='list-unstyled'>
                                <li><Link className='link' to='/'>Home</Link></li>
                                <li><Link className='link' to='/about'>About</Link></li>
                                <li><Link className='link' to='/contact'>Contact</Link></li>
                            </ul>
                        </div>
                        <div className='col-6 col-lg-2 pt-5'>
                            <h5 className='font-two'>Gallery</h5>
                            <ul className='list-unstyled'>
                                <li><Link className='link' to='/gallery'>All</Link></li>
                                <li><Link className='link' to='/gallery/landscape'>Landscape</Link></li>
                                <li><Link className='link' to='/gallery/seascape'>Seascape</Link></li>
                                <li><Link className='link' to='/gallery/floral'>Floral</Link></li>
                            </ul>
                        </div>
                        <div className='col-6 col-lg-2 pt-5'>
                            <h5 className='font-two'>Paintings</h5>
                            <ul className='list-unstyled'>
                                <li><Link className='link' to='/gallery/available'>Available Works</Link></li>
                                <li><Link className='link' to='/gallery/sold'>Sold Works</Link></li>
                            </ul>
                        </div>
                        <div className='col-6 col-lg-2 align-items-center pt-5'>
                            <h5 className='font-two py-2'>Secure Payments</h5>
                            <div className="row">
                                <div className="col-6 col-md-4">
                                    <img className="img-fluid" src='/assets/images/stripe.png' width='50' height='50' alt='stripe logo' />
                                </div>
                                <div className="col-6 col-md-4">
                                    <img className="img-fluid" src='/assets/images/visa.png' width='50' height='50' alt='stripe logo' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center layerlabs pb-4">
                        <a href={URL}><img src="/assets/images/layerlabs.png" width='26px' height='26px' alt="layerlabs logo" />
                            <span className="layerlogo ml-2">Created & Designed by Layerlabs.io</span>
                        </a>
                    </div>
                    <hr></hr>
                    <div className='row py-4  footer-bottom'>
                        <div className='col-12 col-lg-6'>
                            <p>© 2022 Shirleys Art Studio. All rights reserved.</p>
                        </div>
                        <div className='col-4 col-md-2 col-lg-2'>
                            <Link className='link' to='/terms-and-conditions'>Terms & Conditions</Link>
                        </div>
                        <div className='col-4 col-md-2 col-lg-2'>
                            <Link className='link' to='/privacy-policy'>Privacy Policy</Link>
                        </div>
                        <div className='col-4 col-md-2 col-lg-2'>
                            <Link className='link' to='/sales-and-refunds'>Sales & Refunds</Link>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default Footer;