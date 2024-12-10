import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context/Context";
import NavBar from "../NavBar/NavBar";
import CartElements from "./CartElements";
import CartTotal from "./CartTotal";

import './CartContent.css';

const CartContent = () => {
  const { cart } = useContext(Context);
  const navigate = useNavigate(); 
  const isAuthenticated = sessionStorage.getItem('loggedInUser');
  const role = sessionStorage.getItem('userRole');
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  if (role == 'admin') {
    navigate('/admin');
}

  }, [isAuthenticated, navigate]);

  return (
    <>
      <NavBar />
      {cart.length > 0 ? (
        <>
          <CartElements />
          <CartTotal />
        </>
      ) : (
        <h2 className='cart-message-center'>Tu carrito esta vacio</h2>
      )}
    </>
  );
};

export default CartContent;
