//importing main links
import React, { Component } from 'react';
import { Card, CardBody, FormGroup, Label, Form, Input } from 'reactstrap';
import { FadeTransform} from 'react-animation-components';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

const SERVICE_ID = process.env.REACT_APP_SERVICE_ID;
const TEMPLATE_ID = process.env.REACT_APP_TEMPLATE_ID;
const USER_ID = process.env.REACT_APP_USER_ID;

//----MAIN CONTACT PAGE
class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_name: '',
            user_email: '',
        };
    }

    render() {
        /* handling contact form submission */
        const handleOnSubmit = (e) => {
            e.preventDefault();
            emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID)
              .then((result) => {
                console.log(result.text);
                Swal.fire({
                  icon: 'success',
                  title: 'Message Sent Successfully'
                })
              }, (error) => {
                console.log(error.text);
                Swal.fire({
                  icon: 'error',
                  title: 'Ooops, something went wrong',
                  text: error.text,
                })
              });
            e.target.reset()
        };
        /* Contact page form */
        const RenderContactForm = () => {
            return (
                    <div>
                        <FadeTransform in
                        transformProps={{
                        exitTransform: 'scale(0.3) translateY(-20%)'
                        }}>
                        <Card className='custom-card font-two'>
                            <div className='row pt-4'>
                                <div className='col-12'>
                                    <img src='/assets/images/chat.png' width='60' height='60' alt='cart' />
                                </div>
                            </div>
                            <CardBody>
                                <Form className='p-4' onSubmit={handleOnSubmit}>
                                    <FormGroup>
                                        <Label htmlFor='user_email'><span className='fa fa-envelope mr-2'></span><b>Email<span className='text-danger'> *</span></b></Label>
                                        <Input
                                        type='email'
                                        id='user_email'
                                        innerRef={(input) => this.user_email = input}
                                        name='user_email'
                                        placeholder='@email.com'
                                        required
                                        />
                                        </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor='user_name'><span className='fa fa-user mr-2'></span><b>Full Name<span className='text-danger'> *</span></b></Label>
                                        <Input
                                        type='text'
                                        id='user_name'
                                        innerRef={(input) => this.user_name = input}
                                        name='user_name'
                                        placeholder='Full Name'
                                        required
                                        />
                                        </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor='user_message'><span className='fa-solid fa-message mr-2'></span><b>Message<span className='text-danger'> *</span></b></Label>
                                        <Input
                                        type='textarea'
                                        id='user_message'
                                        name='user_message'
                                        placeholder='Message…'
                                        rows='6'
                                        required
                                        />
                                    </FormGroup>
                                    <button type='submit' className='btn btn-primary btn-block px-4 my-3'>Send Message</button>
                                </Form>
                            </CardBody>
                        </Card>
                        </FadeTransform>
                    </div>   
            );
        }


        return (
            <>
                <div className='row-lt-grey small-screen py-5'>
                {/* <AboutHeader />  */}
                    <div className='container'>
                        <div className='row text-center py-5'>
                            <div className='col-12 col-md-6'>
                                <h1 className='font-two large-text gradient-text pt-5 pb-2'>Have any questions?</h1>
                                <h2 className='font-two text-center gradient-text py-4'>Get in touch!</h2>
                                <img src='/assets/images/message.png' width='360px' height='360px' alt='contact' />
                            </div>
                            <div className='col-12 col-md-6 align-self-center'>
                                {/* rendering contact form */}
                                <RenderContactForm />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className='row-grey pb-5'>
                    <div className='col-12 text-center pt-4'>
                        <h1 className='font large-text-two py-5'>Featured Paintings</h1>
                    </div> */}
                    {/* rendering homepage featured */}
                    {/* <div className='container container-avail p-5'>
                        <div className='row'>
                                <HomeFeatured 
                                item={this.props.painting1} 
                                isLoading={this.props.isLoading}
                                errMsg={this.props.errMsg}
                                />
                                <HomeFeatured 
                                item={this.props.painting2}
                                isLoading={this.props.isLoading} 
                                errMsg={this.props.errMsg}
                                />
                                <HomeFeatured 
                                item={this.props.painting3}
                                isLoading={this.props.isLoading} 
                                errMsg={this.props.errMsg}
                                />
                                <HomeFeatured 
                                item={this.props.painting4} 
                                isLoading={this.props.isLoading}
                                errMsg={this.props.errMsg}
                                />
                                <HomeFeatured 
                                item={this.props.painting5} 
                                isLoading={this.props.isLoading}
                                errMsg={this.props.errMsg}
                                />
                                <HomeFeatured 
                                item={this.props.painting6} 
                                isLoading={this.props.isLoading}
                                errMsg={this.props.errMsg}
                            />
                        </div>
                    </div>
                    <div className='row py-5'>
                        <div className='col-12 text-center'>
                            <Link to='/gallery' className='btn btn-dark font-two py-2 px-4'>View All<span className='fa fa-chevron-right ml-2'></span></Link>
                        </div>
                    </div>
                </div> */}
            </>
        );
    }
}

export default Contact;