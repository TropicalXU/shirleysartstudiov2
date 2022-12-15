import React from 'react'
import { useSnackbar } from 'notistack';
import { Link } from 'react-router-dom';

const Cart = ({cartItems, removeFromCart, clearCart}) => {


    const RemoveFromCart = ({item}) => {
        const { enqueueSnackbar } = useSnackbar();
        
        const handleClick = (e) => {
            e.preventDefault();
            removeFromCart(item)
            enqueueSnackbar(<p className='font-two pt-3'>Item Successfully removed from cart!</p>, {
                variant: 'warning'
            });
        };
        
        return (
            <button className='btn' onClick={handleClick}><span className='fa fa-trash fa-lg'></span></button>
        );
    }
        

        const CartItems = ({cartItem , removeFromCart, index}) => {

            const cart = cartItem.map((item) => {
          
                return (
                    <React.Fragment key={item.id.toString()}>
                        <li>
                            <div className='row py-2'>
                                <div className='col-4'>
                                    <img src={item.image} className='img-painting' width='80' height='80' alt={item.image} />
                                </div>
                                <div className='col-6 text-center'>
                                    <p className='font'>{item.title}</p>
                                    <p className='font-two'>€ {item.price}</p>
                                    <Link className='btn-dark font-two px-4 py-2' to={`/gallery/${item.id}`}>View</Link>
                                </div>
                                <div className='col-2'>
                                    <RemoveFromCart removeFromCart={removeFromCart} item={item} />
                                </div>
                            </div>
                        </li>
                        <hr></hr>
                    </React.Fragment>
                );
            });
                
            return (
                <div key={index} className='col-12'>
                    <ul className='list-unstyled'>
                        {cart}
                    </ul>
                </div>
            );
        }
        
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <CartItems cartItem={cartItems} removeFromCart={removeFromCart} />
                        <Link to='/checkout' className='btn btn-primary btn-block font-two my-2'>Place Order <span className='fa fa-regular fa-lock ml-2'></span></Link>
                        {/* <button className='btn' onClick={clearCart}>Clear Cart</button> */}
                    </div>
                </div>
                <div className='row'>
                    <div className='col-12'>
                    </div>
                </div>
            </div>
        );
    
}

export default Cart;