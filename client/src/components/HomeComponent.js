//importing main links
import React from 'react';
import { Fade } from 'react-animation-components';
import { Link } from 'react-router-dom';
import { RenderContact } from '../functionalComponents/functionalComponents'
import { HomeFeatured, AvailableWorks } from '../functionalComponents/functionalComponents';

//home page component

/* HOMEPAGE HEADER */
const HomeHeader = () => {
    return (
        <Fade in>
            <div className='home-header d-flex justify-content-center align-items-center'>
                <div className='row home-text text-center'>
                    <div className='col-12 align-self-center'>
                        <h1 className='font home-title py-5 layerlabs'>Shirleys Art Studio</h1>
                        <h5 className='font-two home-header-text'>Jump right in and explore my collection of paintings.</h5>
                        <h5 className='font-two home-header-text'>Browse, shop and feel free to share my work with others!</h5>
                        <Link className='btn btn-dark font-two py-2 px-4 my-4'to='/gallery'>All Works<span className='fa fa-chevron-right ml-2'></span></Link>
                    </div>
                </div>
            </div>
        </Fade>
    );
}


const Home = (props) => {

    return (
        <>
            <div className='row-lt-grey pb-5'>
                <div className='container-fluid pt-2'>
                {/* rendering home page header */}
                    <HomeHeader />
                </div>
                <div className='col-12 text-center pt-4'>
                    <h1 className='font large-text-two py-5'>Featured Paintings</h1>
                </div>
                {/* rendering homepage featured */}
                <div className='container container-avail p-5'>
                    <div className='row'>
                        <HomeFeatured 
                        item={props.painting1} 
                        isLoading={props.isLoading}
                        errMsg={props.errMsg}
                        />
                        <HomeFeatured 
                        item={props.painting2}
                        isLoading={props.isLoading} 
                        errMsg={props.errMsg}
                        />
                        <HomeFeatured 
                        item={props.painting3}
                        isLoading={props.isLoading} 
                        errMsg={props.errMsg}
                        />
                        <HomeFeatured 
                        item={props.painting4} 
                        isLoading={props.isLoading}
                        errMsg={props.errMsg}
                        />
                        <HomeFeatured 
                        item={props.painting5} 
                        isLoading={props.isLoading}
                        errMsg={props.errMsg}
                        />
                        <HomeFeatured 
                        item={props.painting6} 
                        isLoading={props.isLoading}
                        errMsg={props.errMsg}
                        />
                    </div>
                </div>
                <div className='row py-5'>
                    <div className='col-12 text-center'>
                        <Link to='/gallery' className='btn btn-dark font-two py-2 px-4'>View All<span className='fa fa-chevron-right ml-2'></span></Link>
                    </div>
                </div>
                <div className='container py-5'>
                    <div id='bgDark' className='row py-5 text-white container-avail'>
                        <div className='col-12 text-center py-4'>
                            <span className='fa fa-quote-left fa-lg'></span>
                            {/* <span className='fa fa-chevron-down'></span> */}
                            <h1 className='font-two p-5'>Shirley Hackett is an Irish artist based in Kildare. Shirley's main work features a variety of subjects, particulary landscapes, seascapes and flowers.</h1>
                            <p>________________________</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row row-grey py-5'>
                <div className='col-12 text-center'>
                    <h1 className='font large-text-two py-5'>Available Works</h1>
                </div>
                <div className='container container-avail p-5'>
                    <div className='row py-4'>
                        <div className='col-12 text-center text-white pb-5'>
                            <h4 className='py-2 text-grey font-two'>Check out my range of available works.</h4>
                        </div>
                        {/* rendering homepage available */}
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
                <div className='container pt-5'>
                    {/* rendering contact */}
                    <RenderContact />
                </div>
            </div>
        </>
    );
}
    


export default Home;