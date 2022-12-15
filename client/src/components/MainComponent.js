//importing main links
import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Gallery from './GalleryComponent';
import Available from './AvailableComponent';
import Sold from './SoldComponent';
import Landscape from './LandscapeComponent';
import Seascape from './SeascapeComponent';
import Floral from './FloralComponent';
import PaintingDetail from './PaintingDetailComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import TermsAndConditions from './TermsAndConditionsComponent';
import PrivacyPolicy from './PrivacyPolicyComponent';
import SalesAndRefunds from './SalesAndRefundsComponent';
import Stripe from './StripeContainer';
import PaymentSuccess from './PaymentSuccessComponent';
import CookieConsent from 'react-cookie-consent';
import { Switch, Route, Redirect, Link, withRouter} from 'react-router-dom'
import { COUNTRIES } from '../shared/countries';
import { connect } from 'react-redux';
import { addToCart, clearCart, fetchPaintings, fetchPaintingsId, removeFromCart } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import StripeCartCheckout from './StripeCartCheckout';
import PaymentFailed from './PaymentFailedComponent';


const mapStateToProps = state => {
    return {
      paintings: state.paintings,
      cart: state.cart
    }
}

const mapDispatchToProps = (dispatch) => ({
    fetchPaintings: (paintings) => {
        dispatch(fetchPaintings())
        localStorage.setItem('paintings', JSON.stringify(paintings));
    },

    fetchPaintingsId: (painting) => {
        dispatch(fetchPaintingsId());
        localStorage.setItem('painting', JSON.stringify(painting));
    },

    addToCart: (item) => {
        dispatch(addToCart(item));
    },

    removeFromCart: (item) => {
        dispatch(removeFromCart(item));
    },
    clearCart: () => {
        dispatch(clearCart());
    },
    resetFeedbackForm: () => { dispatch(actions.reset('feedback'))}

});

//---MAIN COMPONENT-----
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countries: COUNTRIES
        }
    }

    componentDidMount() {
        this.props.fetchPaintings();
    }

    render() {
        //home page - adding in props
        const HomePage = () => {
            return (
                <Home
                    painting1={this.props.paintings.paintings.filter((painting) => painting)[0]} 
                    painting2={this.props.paintings.paintings.filter((painting) => painting)[1]} 
                    painting3={this.props.paintings.paintings.filter((painting) => painting)[2]} 
                    painting4={this.props.paintings.paintings.filter((painting) => painting)[3]} 
                    painting5={this.props.paintings.paintings.filter((painting) => painting)[4]} 
                    painting6={this.props.paintings.paintings.filter((painting) => painting)[5]} 
                    available1={this.props.paintings.paintings.filter((painting) => painting)[2]} 
                    available2={this.props.paintings.paintings.filter((painting) => painting)[31]} 
                    available3={this.props.paintings.paintings.filter((painting) => painting)[37]}
                    isLoading={this.props.paintings.isLoading}
                    errMsg={this.props.paintings.errMsg}
                />
            );
        }
        // painting detail page - adding in props
        const PaintingWithId = ({match}) => {
            return (
                <PaintingDetail
                    painting={this.props.paintings.paintings.filter((painting) => painting.id === parseInt(match.params.id, 10))[0]}
                    addToCart={this.props.addToCart}
                    paintings={this.props.paintings.paintings}
                    available1={this.props.paintings.paintings.filter((painting) => painting)[2]} 
                    available2={this.props.paintings.paintings.filter((painting) => painting)[31]} 
                    available3={this.props.paintings.paintings.filter((painting) => painting)[37]}
                    isLoading={this.props.paintings.isLoading}
                    errMsg={this.props.paintings.errMsg}
                />
            );
        }

        const PaintingCheckout = () => {
            return <StripeCartCheckout
                cartItems={this.props.cart.cartItems}
                removeFromCart={this.props.removeFromCart}
                paintings={this.props.paintings.paintings}
                available1={this.props.paintings.paintings.filter((painting) => painting)[2]} 
                available2={this.props.paintings.paintings.filter((painting) => painting)[31]} 
                available3={this.props.paintings.paintings.filter((painting) => painting)[37]} 
                isLoading={this.props.paintings.isLoading}
                errMsg={this.props.paintings.errMsg}
                clearCart={this.props.clearCart}
                resetFeedbackForm={this.props.resetFeedbackForm} 
             />
        }

        const PaintingIdCheckout = ({match}) => {
            return (
                <Stripe
                    painting={this.props.paintings.paintings.filter((painting) => painting.id === parseInt(match.params.id, 10))[0]}
                    available1={this.props.paintings.paintings.filter((painting) => painting)[2]} 
                    available2={this.props.paintings.paintings.filter((painting) => painting)[31]} 
                    available3={this.props.paintings.paintings.filter((painting) => painting)[37]} 
                    resetFeedbackForm={this.props.resetFeedbackForm} 
                    isLoading={this.props.paintings.isLoading}
                    errMsg={this.props.paintings.errMsg}
                />
            );
        }

        const GalleryPage = () => {
            return (
                <Gallery
                    paintings={this.props.paintings.paintings} 
                    isLoading={this.props.paintings.isLoading}
                    errMsg={this.props.paintings.errMsg}
                    addToCart={this.props.addToCart}
                />
            );
        }

        const ContactPage = () => {
            return (
                <Contact 
                painting1={this.props.paintings.paintings.filter((painting) => painting)[0]} 
                painting2={this.props.paintings.paintings.filter((painting) => painting)[1]} 
                painting3={this.props.paintings.paintings.filter((painting) => painting)[2]} 
                painting4={this.props.paintings.paintings.filter((painting) => painting)[3]} 
                painting5={this.props.paintings.paintings.filter((painting) => painting)[4]} 
                painting6={this.props.paintings.paintings.filter((painting) => painting)[5]} 
                isLoading={this.props.paintings.isLoading}
                errMsg={this.props.paintings.errMsg}
                />
            );
        }

        return (
            <div>
                {/* RENDERING ROUTES */}
                <Header 
                cartItems={this.props.cart.cartItems} 
                removeFromCart={this.props.removeFromCart} 
                clearCart={this.props.clearCart}/>
                <Switch>
                    <Route exact path='/' component={ HomePage } />
                    <Route exact path='/home' component={ HomePage } />
                    <Route key={'gallery'} exact path='/gallery' component={ GalleryPage } />
                    <Route key={'available'} exact path='/gallery/available' component={ () =>
                         <Available 
                         paintings={this.props.paintings.paintings} 
                         addToCart={this.props.addToCart} 
                         isLoading={this.props.paintings.isLoading}
                         errMsg={this.props.paintings.errMsg}
                        />} />
                    <Route key={'sold'} exact path='/gallery/sold' component={ () => 
                        <Sold 
                        paintings={this.props.paintings.paintings} 
                        available1={this.props.paintings.paintings.filter((painting) => painting)[2]} 
                        available2={this.props.paintings.paintings.filter((painting) => painting)[31]} 
                        available3={this.props.paintings.paintings.filter((painting) => painting)[37]} 
                        isLoading={this.props.paintings.isLoading}
                        errMsg={this.props.paintings.errMsg}
                        />} />
                    <Route key={'landscape'} exact path='/gallery/landscape' component={ () => 
                        <Landscape
                        paintings={this.props.paintings.paintings} 
                        addToCart={this.props.addToCart} 
                        isLoading={this.props.paintings.isLoading}
                        errMsg={this.props.paintings.errMsg}
                    />} />
                    <Route key={'seascape'} exact path='/gallery/seascape' component={ () => 
                        <Seascape 
                        paintings={this.props.paintings.paintings} 
                        addToCart={this.props.addToCart}
                        isLoading={this.props.paintings.isLoading}
                        errMsg={this.props.paintings.errMsg}
                    />} />
                    <Route key={'floral'} exact path='/gallery/floral' component={ () => 
                        <Floral 
                        paintings={this.props.paintings.paintings} 
                        addToCart={this.props.addToCart}
                        isLoading={this.props.paintings.isLoading}
                        errMsg={this.props.paintings.errMsg}
                    />} />
                    <Route exact path='/gallery/:id' component={ PaintingWithId } />
                    <Route exact path='/about' component={ () => 
                        <About 
                        available1={this.props.paintings.paintings.filter((painting) => painting)[2]} 
                        available2={this.props.paintings.paintings.filter((painting) => painting)[31]} 
                        available3={this.props.paintings.paintings.filter((painting) => painting)[37]} 
                        isLoading={this.props.paintings.isLoading}
                        errMsg={this.props.paintings.errMsg}
                    />} />
                    <Route exact path='/contact' component={ ContactPage } />
                    <Route exact path='/terms-and-conditions' component={ () => <TermsAndConditions /> } />
                    <Route exact path='/privacy-policy' component={ () => <PrivacyPolicy /> } />
                    <Route exact path='/sales-and-refunds' component={ () => <SalesAndRefunds /> } />
                    <Route exact path='/checkout/' component={ PaintingCheckout } />
                    <Route exact path='/checkout/:id' component={ PaintingIdCheckout } />
                    <Route exact path='/payment-success' component={ ()  => <PaymentSuccess />} />
                    <Route exact path='/payment-failed' component={ () => <PaymentFailed />} />
                    <Redirect to='/' />
                </Switch>
                {/* RENDERING COOKIE CONSENT */}
                <div className='container cookie-consent'>
                    <CookieConsent 
                        buttonText='Accept All'
                        buttonClasses='accept-btn py-2'
                        containerClasses='container-fluid cookie-consent'
                        declineButtonText='Decline'
                        enableDeclineButton
                        declineButtonClasses=''
                        declineButtonStyle={{background: 'white', color: 'black', borderRadius: 25, fontWeight: 400, fontSize:14, fontFamily: 'Kanit', border: 1, borderColor: 'darkgrey', paddingLeft: 20, paddingRight: 20, paddingTop: 6, paddingBottom: 6}}
                        style={{background: 'white'}} 
                        className='cookie-consent ml-5'
                        buttonStyle={{background: '#24a0ed ',color:'white', borderRadius: 25, paddingLeft: 15, paddingRight: 15, fontWeight: 400, fontSize: 14, fontFamily: 'Kanit'}}>
                        <div className='text-black'>
                            <div className='row py-1'>
                                <div className='col-12 col-md-1 py-3'>
                                    <span className='fa fa-info text-black align-self-center fa-lg'></span>
                                </div>
                                <div className='col-11 pt-2'>
                                    <p className=''>We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies. Read more <Link to='/privacy-policy'>Privacy Policy</Link></p>
                                </div>
                            </div>
                        </div>
                    </CookieConsent>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));