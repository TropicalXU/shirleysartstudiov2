//importing main links
import React from 'react';
import { Fade } from 'react-animation-components';
import { Link } from 'react-router-dom';
import { RenderRequest, AvailableWorks } from '../functionalComponents/functionalComponents';


//----MAIN ABOUT PAGE
const About = (props) => {


    //about page header
    const AboutHeader = () => {
        return (
            <Fade in>
                <div className='about-header d-flex justify-content-center align-items-center'>
                    <div className='row text-center'>
                        <div className='col-12 align-self-center'>
                            <h1 className='font home-title home-text py-5'>Shirley Hackett Artist</h1>
                        </div>
                    </div>
                </div>
            </Fade>
        );
    }

    return (
        <>
            <div className='row-lt-grey pb-5'>
                {/* rendering about header*/}
                <div className='container-fluid pt-2'>
                    <AboutHeader /> 
            </div>
                <div className='row text-center py-4'>
                    <div className='col-12'>
                    {/* <h1 className='font'>About the artist</h1> */}
                    </div>
                </div>
                <div className='container container-avail py-5 my-4'>
                    <div className='row font-two'>
                        <div className='col-12 text-center p-5'>
                            <span className='fa fa-quote-left fa-lg py-4'></span>
                            <p className='about-text py-4'>I am an Irish artist living and working from my studio in Kildare. I have always been passionate about art in all its forms and I take my inspiration from the natural beauty of the world that surrounds us. I enjoy painting a variety of subjects, particulary landscapes, seascapes and flowers. I try to create an interesting composition and bring it to life by capturing the effects of light and shade.</p>
                        </div>
                    </div>
                </div>
                <div className='container py-5 my-4'>
                    <div className='row d-flex justify-content-center'>
                        <div className='col-12 col-md-3 my-2'>
                            <img src='/assets/images/shirley.jpg' className='img-painting' width='100%' height='260px' alt='artist' />
                        </div>
                        <div className='col-12 col-md-3 my-2'>
                            <img src='/assets/images/about-bg.jpg' className='img-painting' width='100%' height='260px' alt='painting' />
                        </div>
                        <div className='col-12 col-md-3 my-2'>
                            <img src='/assets/images/studio-bg.jpg' className='img-painting' width='100%' height='260px' alt='painting' />
                        </div>
                    </div>
                </div>
                <div id='bgDark' className='container container-avail py-5 mb-5'>
                    <div className='row'>
                        <div className='col-12 font-two text-center p-5'>
                            <span className='fa fa-quote-left text-white fa-lg py-4'></span>
                            <p className='about-text text-white'>My paintings are inspired by the rugged landscapes of Ireland and the vibrant colours that emanate from its natural beauty throughout the seasons. I strive to visually capture and record special moments, people and places in time and hope that the viewer will engage and connect emotionally with the images that emerge on the canvas. I work mostly in acrylics using bold bright colours to create a sense of light and atmosphere in my paintings. I have exhibited my work in a number of venues in Kildare and Dublin. If you have something of personal interest which you would like to see on canvas I am happy to accept commisions.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row row-grey py-5'>
                <div className='col-12 text-center'>
                    <h1 className='font py-5'>Available Works</h1>
                </div>
                <div className='container container-avail p-5 mb-4'>
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
                    <div className='row py-5'>
                        <div className='col-12 text-center'>
                            <Link to='/gallery/available' className='btn btn-dark font-two py-2 px-4'>View More<span className='fa fa-chevron-right ml-2'></span></Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row-lt-grey'>
                <div className='container pt-5'>
                    {/* rendering contact form */}
                    <RenderRequest />
                </div>
            </div>
        </>
    );
    
}

export default About;
