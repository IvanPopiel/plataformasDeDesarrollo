import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context/Context";
import NavBar from "../Navbar/Navbar";
import CartElements from "./CartElements";
import CartTotal from "./CartTotal";

import './CartContent.css';

const CartContent = () => {
  const { cart } = useContext(Context);
  const navigate = useNavigate(); 
  const isAuthenticated = sessionStorage.getItem('user_id');
  useEffect(() => {
    console.log('cart: ',cart);
    if (!isAuthenticated) {
      navigate('/login');
    }

  }, [isAuthenticated, navigate]);

  return (
    <>
      <NavBar />
      {cart && cart.products && cart.products.length > 0 ? (
        <>
          <CartElements />
          <CartTotal />
        </>
      ) : (
        <h2 className='cart-message-center'>Tu carrito está vacío</h2>
      )}
    </>
  );
  
};

export default CartContent;
