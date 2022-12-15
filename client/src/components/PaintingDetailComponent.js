//importing main links
import React from 'react';
import { CardBody} from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';
import { FadeTransform } from 'react-animation-components';
import { Loading } from './LoadingComponent';
import { RenderRequest, AvailableWorks, AddToCart } from '../functionalComponents/functionalComponents';


const RenderPainting = ({item, addToCart, index}) => {
    if(item.price === 0 || item.isAvailable === false) {
        return (
            <> <div className='container-fluid detail-container py-5 mt-3' key={item.id.toString()}>
                    <div className='row'>
                        <div className='col-12 col-md-6'>
                            <FadeTransform in
                            transformProps={{
                            exitTransform: 'scale(0.3) translateY(-20%)'
                            }}>
                                <img src={item.image} className='img-painting-detail' width='100%' height='420px' alt='sold painting' />
                                <p className='font artist-text pt-4'><i>{item.artist}</i></p>
                            </FadeTransform>
                        </div>
                        <div className='col-12 col-md-6'>
                            <div className='container-avail text-center'>
                                <CardBody className='font-two py-5'>
                                    <h2 className='font'>{item.title}</h2>
                                    <div className='col-12 grey-bg'>
                                    <h3 className='sold-item gradient-text my-4 py-3'><b>Sold</b></h3>
                                    </div>
                                    <h6>{item.description}</h6>
                                </CardBody>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    else {
        return (
            <> <div key={index} className='container-fluid detail-container py-5 mt-3'>
                    <div className='row'>
                        <div className='col-12 col-md-6'>
                            <FadeTransform in
                            transformProps={{
                            exitTransform: 'scale(0.3) translateY(-20%)'
                            }}>
                                <img src={item.image} className='img-painting' width='100%' height='420px' alt='available painting' />
                                <p className='font artist-text pt-4'><i>{item.artist}</i></p>
                            </FadeTransform>
                        </div>
                        <div className='col-12 col-md-6'>
                            <div className='container-avail text-center'>
                                <CardBody className='font-two py-5'>
                                    <h2 className='font'>{item.title}</h2>
                                    <h1 className='py-4'>€{item.price}</h1>
                                    <h6>{item.description}</h6>
                                    <p className='pt-4'>Paintings come signed by the artist.</p>
                                    <p>Frames are not included.</p>
                                    <div className='row d-flex justify-content-center'>
                                    <NavLink to={`/checkout/${item.id}`} className='btn btn-primary font-two my-4 px-4'>Purchase</NavLink>
                                    <AddToCart item={item} addToCart={addToCart} />
                                    </div>
                                </CardBody>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}


const PaintingDetail = (props) => {

    if(props.errMsg) {
        return(
            <div className='container py-5'>
                <div className='row d-flex justify-content-center py-5'>
                    <div className='col-12 col-md-8'>
                        <div className='error-card'>
                            <div className='col-12 text-center'>
                                <img src='/assets/images/error.png' width='220' height='220' alt='error message' />
                                <h4 className='font-two'>{props.errMsg}</h4>
                                <h2 className='font-two py-5'>Sorry something went wrong!</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else if(props.isLoading) {
        return (
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        );
    } else {
   
        return (
            <>
                <div className='row-lt-grey pb-5'>
                    <div className='container'>
                        <div className='row pt-3'>
                            <div className='mt-5 pb-4'>
                                <Link className='breadcrumb-link text-white' to='/gallery'>
                                    <span className='fa fa-chevron-left b-link mr-2'></span> <span className='b-link font-two'>Back to Gallery</span>
                                </Link>
                            </div>
                        </div>
                        <div className='row pb-5'>
                            {/* rendering painting detail */}
                            <RenderPainting items={props.cartItem} item={props.painting} addToCart={props.addToCart} />
                        </div>
                    </div>
                </div>
                {!props.painting.isAvailable ? (
                <div className='row row-grey py-5'>
                    <div className='col-12 text-center'>
                        <h1 className='font py-5'>Available Works</h1>
                    </div>
                    <div className='container container-avail p-5 mb-5'>
                        <div className='row py-4'>
                            <div className='col-12 text-center text-white pb-5'>
                                <h4 className='py-2 text-grey font-two'>Check out my range of available works.</h4>
                            </div>
                            {/* rendering available works */}
                            <AvailableWorks 
                            item={props.available1} 
                            isLoading={props.isLoading} 
                            errMsg={props.errMsg}
                            />
                            <AvailableWorks 
                            item={props.available2}
                            isLoading={props.isLoading} 
                            errMsg={props.errMsg}
                            />
                            <AvailableWorks 
                            item={props.available3}
                            isLoading={props.isLoading} 
                            errMsg={props.errMsg}
                            />
                        </div>
                        <div className='row pt-5'>
                            <div className='col-12 text-center'>
                                <Link to='/gallery/available' className='btn btn-dark font-two py-2 px-4'>View More<span className='fa fa-chevron-right ml-2'></span></Link>
                            </div>
                        </div>
                    </div>
                </div>
                ): (
                    <div></div>
                )
                }
                <div className='row-lt-grey'>
                    <div className='container pt-4'>
                        <RenderRequest />
                    </div>
                </div>
            </>
        );
    }
}

export default PaintingDetail;