//importing main links
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { CountryDropdown} from 'react-country-region-selector';
import { Loading } from '../components/LoadingComponent';
import { useSnackbar } from 'notistack';
import { FadeTransform } from 'react-animation-components';
import { Button } from 'reactstrap';
import ScrollTop from '../functionalComponents/ScrollTop';

const FLATICON_URL = process.env.REACT_APP_FLATICON_URL;

//----functional components to reuse
function validateURL(url) {
    const parsed = new URL(url)
    return ['https:', 'http:'].includes(parsed.protocol)
}
//render contact section
export const RenderContact = () => {
    return (
        <div className='row row-contact ml-auto py-5'>
            <div className='col-12 col-md-8 text-center align-self-center'>
                <h1 className='large-text-two gradient-text font-two'>Interested in my paintings?</h1>
                <Link to='/contact' className='btn btn-dark font-two py-2 px-4 my-4'>Get in touch<span className='fa fa-chevron-right ml-2'></span></Link>
            </div>
            <div className='col-12 col-md-4 small-screen text-center py-5'>
                <a href={FLATICON_URL}>
                    <img src='/assets/images/message.png' className='img-fluid' width='100%' height='180px' alt='mail' />
                </a>
            </div>
        </div>
    );
}

export const RenderRequest = () => {
    return (
        <div className='row row-request py-5'>
            <div className='col-12 col-md-8 text-center align-self-center'>
                <h1 className='large-text-two gradient-text font-two pb-3'>Do you have a personal request?</h1>
                <Link to='/contact' className='btn btn-dark font-two py-2 px-4 my-4'>Get a quote<span className='fa fa-chevron-right ml-2'></span></Link>
            </div>
            <div className='col-12 col-md-4 small-screen text-center py-5'>
                <a href={FLATICON_URL}>
                    <img src='/assets/images/quote.png' className='img-fluid' width='100%' height='180px' alt='mail' />
                </a>
            </div>
        </div>
    );
}

export const RenderPaintings = ({item, index}) => {
    return (
        <>  
            <FadeTransform key={index}  in
                transformProps={{
                exitTransform: 'scale(0.3) translateY(-20%)'
            }}>
                <Link to={`/gallery/${item.id}`}>
                    <div className='img-container'>
                        <img src={item.image} className='img-painting' width='100%' height='330px' alt={item.title} />
                    <Button type='submit' className='btn-light font-two bg-gradient text-white px-4 py-2'>VIEW</Button>
                    </div>
                </Link>
            </FadeTransform>
        </>
    );
}

//render available works section
export const AvailableWorks = ({item, isLoading, errMsg, index}) => {
    if(isLoading) {
        return (
            <Loading key={index} />
        );
    }
    else if(errMsg) {
        return (
            <div key={index} className='row ml-auto px-4'>
                <div className='col text-center'>
                    <div className='error-card'>
                        <img src='/assets/images/error.png' width='90' height='90' alt='error message' />
                        <h4 className='font-two'>{errMsg}</h4>
                        <h6 className='font-two py-5'>Sorry something went wrong!</h6>
                    </div>
                </div>
            </div>
        );
    }
    return (
        
        <div className='col-12 col-md-4 col-lg-4 py-4'>
            <Link to='/gallery/available'>
                <img src={item.image} className='img-painting' width='100%' height='300px' alt={item.title} />
            </Link>
        </div>
    );
}

export const HomeFeatured = ({item, isLoading, errMsg, index}) => {

    if(isLoading) {
        return (
            <Loading key={index} />
        );
    }
    else if(errMsg) {
        return (
            <div key={index} className='row ml-auto px-4'>
                <div className='col text-center'>
                    <div className='error-card'>
                        <img src='/assets/images/error.png' width='90' height='90' alt='error message' />
                        <h4 className='font-two'>{errMsg}</h4>
                        <h6 className='font-two py-5'>Sorry something went wrong!</h6>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <>
            <div key={item.id.toString()} className='col-12 col-md-6 col-lg-4 py-4'>
                <FadeTransform in
                    transformProps={{
                    exitTransform: 'scale(0.3) translateY(-20%)'
                }}>
                    <Link key={item.id} to={`/gallery/${item.id}`}>
                        <div className='img-container'>
                            <img src={item.image} className='img-painting' width='100%' height='300px' alt={item.title} />
                            <Button type='submit' className='btn-light font-two bg-gradient text-white px-4 py-2'>VIEW</Button>
                        </div>
                    </Link>
                </FadeTransform>
            </div>
        </>
    );
}

export class AddToCart extends Component {

    render() {

        const AddItemToCart = ({item, index}) => {

            const { enqueueSnackbar } = useSnackbar();
            const handleClick = (e) => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
                e.preventDefault();
                this.props.addToCart(item)
                enqueueSnackbar(<p className='font-two pt-3'>Item successfully added to cart!</p>, {
                    variant: 'info'
                });
            };

            return (
                <ScrollTop key={index}>
                    <div>
                        <button onClick={handleClick} className='btn btn-dark add-to-cart font-two my-4 px-4 ml-3'><span className='fa fa-plus mr-2'></span>Add to cart</button>
                    </div>
                </ScrollTop>
            );

        }

        return (
            <>
            <AddItemToCart item={this.props.item} addToCart={this.props.addToCart} />
            </>
        )
    }
}

export const Proccessing = () => {
    return (
        <span className="proccessing"></span>
    );
}