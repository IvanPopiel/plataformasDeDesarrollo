import { useContext } from "react";
import { Context } from "../../Context/Context";

const CartItemCounter = ({ product }) => {
    const { cart, setCart, buyProducts, decreaseProduct } = useContext(Context);

    const increase = () => {
        buyProducts(product); 
    };

    const decrease = () => {
        decreaseProduct(product); 
    };

    return (
        <div className="counter-container">
            <p className="counter-button" onClick={decrease}>
                -
            </p>
            <p className="quantity-display">{product.quanty}</p>
            <p className="counter-button" onClick={increase}>
                +
            </p>
        </div>
    );
};

export default CartItemCounter;
