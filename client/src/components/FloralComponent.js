//importing main links
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { AddToCart, RenderContact, RenderPaintings } from '../functionalComponents/functionalComponents';
import { Loading } from './LoadingComponent';


const Floral = (props) => {

    const floralPaintings = props.paintings.map((painting, index) => {
        if(painting.type === 'floral' && painting.isAvailable === true) {
            return (
                <div key={painting.id.toString()} className='col-12 col-md-6 col-lg-4 text-center py-3'>
                    <RenderPaintings item={painting} />
                    <AddToCart addToCart={props.addToCart} item={painting} />
                </div>
            );
        } 
        else if(painting.type === 'floral' && painting.isAvailable === false) {
            return (
                <div key={painting.id.toString()} className='col-12 col-md-6 col-lg-4 text-center py-3'>
                    <RenderPaintings item={painting} />
                    <Button className='btn btn-secondary font-two my-4 px-5'>Sold</Button>
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
        <div className='row-lt-grey pb-5'>
            <div className='container tabs'>
                <div className='row d-flex justify-content-center pt-5'>
                    <div className='col-12 text-center'>
                        <h5 className='font'>Choose from...</h5>
                    </div>
                </div>
                <div className='row d-flex justify-content-center text-center py-5 mx-2'>
                    <div className='col-12 col-md-3 options-tab py-2 my-2'>
                        <Link to='/gallery/landscape' className='btn btn-services font-two active'>LANDSCAPE</Link>
                    </div>
                    <div className='col-12 col-md-3 options-tab py-2 mx-2 my-2'>
                        <Link to='/gallery/seascape' className='btn btn-services font-two ml-1'>SEASCAPE</Link>  
                    </div>
                    <div className='col-12 col-md-3 options-tab-active py-2 my-2'>
                        <Link to='/gallery/floral' className='btn btn-services btn-services-active font-two ml-1'>FLORAL</Link>
                    </div>
                </div>
                <div className='row container-avail mt-3 p-4'>
                    {/* rendering floral paintings */}
                    {floralPaintings}
                </div>
                <RenderContact />
            </div>
        </div>
    );
    
}

export default Floral;