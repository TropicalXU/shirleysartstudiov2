//importing main links
import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem,
    DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import Cart from './CartComponent';

//header component containing navbar
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
        };
        this.toggleNav = this.toggleNav.bind(this);
   
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }


    render() {

        const CartLogoAnimation = ({cartItems, removeFromCart, clearCart}) => {
            if(cartItems.length === 0) {
                return (
                    <NavItem className='py-2'>
                            <span className='fa fa-cart-plus fa-lg text-black mx-4 mb-2'></span>
                    </NavItem>
                );
            }
            else {
                return (
                    <UncontrolledDropdown className='' nav>
                        <DropdownToggle nav className='nav-text nav-cart-items font-two'>
                            <div className='row px-1'>
                                <div className='col-12'>
                                    <span className='fa fa-cart-plus text-white'></span>
                                    <span className='badge rounded-pill bg-danger text-white move-img'>{cartItems.length}</span>
                                </div>
                            </div>
                        </DropdownToggle>
                            <DropdownMenu className='cart-drop-menu' top='true'>
                                <Cart cartItems={cartItems} removeFromCart={removeFromCart} clearCart={clearCart} />
                        </DropdownMenu>  
                    </UncontrolledDropdown>
                );
            }
        }

        return (
            <>  {/* website navbar */}
                <Navbar light color='white' expand='lg' className='navbar'>
                    <div className='container-fluid text-center'>
                        <NavbarBrand href='/'>
                        <img src='/assets/images/logo2.png' height='55' width='56px'
                            alt='Shirleys Studio logo' 
                        />  <span className='navbrand pl-3 '>Shirleys Art Studio</span>
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggleNav} />
                        <Collapse isOpen={this.state.isNavOpen} className='py-3' navbar>
                            <Nav navbar className='ml-auto'>
                                <NavItem>
                                    {!CartLogoAnimation ? (
                                    <NavLink className='nav-link mx-4 px-4 py-2' to='/home'>
                                        <span className='nav-text font-two'>HOME</span>
                                    </NavLink>
                                    ) : (
                                    <NavLink className='nav-link align-self-center mx-4 px-4 py-2 mb-2' to='/home'>
                                        <span className='nav-text font-two'>HOME</span>
                                    </NavLink>
                                    )}
                                </NavItem>
                                <UncontrolledDropdown nav className=''>
                                    {!CartLogoAnimation ? (
                                        <DropdownToggle nav className='nav-link font-two py-2 mx-4 px-4'><span className='nav-text'>Gallery</span><span className='fa fa-chevron-down ml-2'></span></DropdownToggle>
                                    ) : (
                                        <DropdownToggle nav className='nav-link font-two mx-4 px-4 pt-2 pb-3 mb-1'><span className='nav-text'>GALLERY</span><span className='fa fa-chevron-down'></span></DropdownToggle>
                                    )}
                                    <DropdownMenu className='drop-menu' top='true'>
                                        <DropdownItem className='drop-item'>
                                            <NavLink to='/gallery' className='font-two py-2'><span className='fa fa-chevron-right mr-2'></span>All works</NavLink>
                                        </DropdownItem>
                                        <DropdownItem className='drop-item'>
                                            <NavLink to='/gallery/available' className='font-two py-2'><span className='fa fa-chevron-right mr-2'></span>Available</NavLink>
                                        </DropdownItem>
                                        <DropdownItem className='drop-item'>
                                            <NavLink to='/gallery/sold' className='font-two py-2'><span className='fa fa-chevron-right mr-2'></span>Sold</NavLink>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                                <NavItem>
                                    {!CartLogoAnimation ? (
                                    <NavLink className='nav-link mx-4 px-4 py-2' to='/about'>
                                        <span className='nav-text font-two'>ABOUT</span>
                                    </NavLink>
                                    ) : (
                                    <NavLink className='nav-link mx-4 px-4 py-2 mb-2' to='/about'>
                                        <span className='nav-text font-two'>ABOUT</span>
                                    </NavLink>
                                    )}
                                </NavItem>
                                <NavItem>
                                    {!CartLogoAnimation ? (
                                    <NavLink className='nav-link mx-4 px-4 py-2' to='/contact'>
                                        <span className='nav-text font-two'>Contact</span>
                                     </NavLink>
                                    ) : (
                                        <NavLink className='nav-link mx-4 px-4 py-2 mb-2' to='/contact'>
                                       <span className='nav-text font-two'>CONTACT</span>
                                    </NavLink>
                                    )}
                                </NavItem>
                                <CartLogoAnimation cartItems={this.props.cartItems} removeFromCart={this.props.removeFromCart} clearCart={this.props.clearCart} />
                            </Nav>
                            {/* dropdown nav-link - about */}
                    
                        </Collapse>
                    </div>
                </Navbar>
           

            </>
        );
    }
}

export default Header;