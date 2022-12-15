//importing main links
import React from 'react';
import { AvailableWorks, RenderPaintings } from '../functionalComponents/functionalComponents';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Loading } from './LoadingComponent';


const Sold = (props) => {

    const soldPaintings = props.paintings.map((painting, index) => {
        if(painting.isAvailable === false) {
            return (
                <div key={painting.id.toString()} className='col-12 col-md-6 col-lg-4 text-center py-3'>
                    <RenderPaintings item={painting} />
                    <Button className='btn btn-secondary font-two my-4 px-4'>Sold</Button>
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
        <>
            <div className='row-lt-grey pb-5'>
                <div className='container'>
                    <div className='pt-5 pb-4'>
                        <Link className='breadcrumb-link text-white' to='/gallery'>
                            <span className='fa fa-chevron-left b-link mr-2'></span> <span className='b-link font-two'>Back to Gallery</span>
                        </Link>
                    </div>
                </div>
                <div className='container pb-5'>
                    <div className='row container-avail mt-3 p-4'>
                        <div className='col-12 pb-5'>
                            <h1 className='font'>Sold Works</h1>
                        </div>
                        {/* rendering sold paintings*/}
                        {soldPaintings}
                    </div>
                </div>
            </div>
            <div className='row-grey py-5'>
                <div className='container'>
                    <div className='col-12 text-center text-white py-5'>
                                <h4 className='py-2 text-grey font-two'>Check out all available works.</h4>
                            </div>
                    <div className='row container-avail py-5 p-4'>
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
                    <div className='row py-5'>
                        <div className='col-12 text-center'>
                            <Link to='/gallery/available' className='btn btn-dark font-two py-2 px-4'>View More<span className='fa fa-chevron-right ml-2'></span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
    
}

export default Sold;