//importing main links
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { AddToCart, RenderRequest, RenderPaintings } from '../functionalComponents/functionalComponents';

const Gallery = (props, index) => {
   

        const allPaintings = props.paintings.map((painting) => {
            if(painting.isAvailable) {
                return (
                    <div key={painting.id.toString()} className='col-12 col-md-6 col-lg-4 text-center py-3'>
                        <RenderPaintings item={painting} />
                        <AddToCart addToCart={props.addToCart} item={painting} />
                    </div>
                );
            }
            else if(!painting.isAvailable) {
                return (
                    <div key={painting.id.toString()} className='col-12 col-md-4 text-center py-3'>
                        <RenderPaintings item={painting} />
                        <Button className='btn btn-secondary font-two my-4 px-5'>Sold</Button>
                    </div>
                );
            }
            else {
                return (
                    <></>
                );
            }
        });

        if(props.isLoading) {
            return (
                <div key={index} className='container'>
                    <div key={props.isLoading} className='row'>
                        <Loading />
                    </div>
                </div>
            );
        }
        else if(props.errMsg) {
            return(
                <div key={index} className='container py-5'>
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
        }
        else

        return (
            <>
                {/* service page tabs navigation */}
                <div className='row-lt-grey pb-5'>
                    <div className='container tabs'>
                        <div className='row d-flex justify-content-center pt-5'>
                            <div className='col-12 text-center'>
                                <h5 className='font'>Choose from...</h5>
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center text-center py-5 mx-2'>
                            <div className='col-12 col-md-3 options-tab py-2 my-2'>
                                <Link to='/gallery/landscape' className='btn'>
                                    <span className='btn-services font-two'>LANDSCAPE</span>
                                </Link>
                            </div>
                            <div className='col-12 col-md-3 options-tab py-2 mx-2 my-2'>
                                <Link to='/gallery/seascape' className='btn'>
                                    <span className='btn-services font-two'>SEASCAPE</span>
                                </Link>
                            </div>
                            <div className='col-12 col-md-3 options-tab py-2 my-2'>
                                <Link to='/gallery/floral' className='btn'>
                                    <span className='btn-services font-two'>FLORAL</span>
                                </Link>
                            </div>
                        </div>
                        <div className='row container-avail mt-3 p-4'>
                            {allPaintings}
                        </div>
                        <RenderRequest />
                    </div>
                </div>
            </>
        );
    
}

export default Gallery;