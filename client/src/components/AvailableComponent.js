//importing main links
import React from 'react';
import { AddToCart, RenderRequest, RenderPaintings } from '../functionalComponents/functionalComponents';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';


const Available = (props) => {

    const availablePaintings = props.paintings.map((painting, index) => {
        if(painting.isAvailable === true) {
            return (
                <div key={painting.id.toString()} className='col-12 col-md-6 col-lg-4 py-3 text-center'>
                    <RenderPaintings item={painting} addToCart={props.addToCart}/>
                    <AddToCart item={painting} addToCart={props.addToCart} />
                </div>
            );
        } 
        else {
            return (
                <React.Fragment key={index}></React.Fragment>
            );
        }
    });

    if(props.isLoading) {
        return (
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        );
    }
    else if(props.errMsg) {
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
    }
    else

    return (
        <div className='row-lt-grey pb-5' key={props.paintings.id}>
            <div className='container'>
                <div className='pt-5 pb-4'>
                    <Link className='breadcrumb-link text-white' to='/gallery'>
                        <span className='fa fa-chevron-left b-link mr-2'></span> <span className='b-link font-two'>Back to Gallery</span>
                    </Link>
                 </div>
            </div>
            <div className='container'>
                <div className=''>
                    <div className='row container-avail mt-3 p-4'>
                        <div className='col-12 pb-5'>
                            <h1 className='font'>Available Works</h1>
                        </div>
                        {/* rendering available paintings */}
                        {availablePaintings}
                    </div>
                </div>
            </div>
            <div className='container pt-4'>
                <RenderRequest />
            </div>
        </div>
    );
    
}

export default Available;