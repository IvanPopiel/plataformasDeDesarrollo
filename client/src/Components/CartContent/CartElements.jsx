import { useContext } from "react";
import { Context } from "../../Context/Context";
import CartItemCounter from "./CartItemCounter";

const CartElements = () => {
    const { cart, deleteProduct } = useContext(Context);
    return (
        <div>
            {cart && Array.isArray(cart.products) ? (
                cart.products.map((product,index) => (
                    <div className="product-card-container" key={`${product.id}-${index}`}>
                        <img src={product.image_url} alt="product-card" />
                        <h3>{product.productName}</h3>
                        <CartItemCounter product={product} />
                        <h4>{product.productPrice * product.quantity}</h4>
                        <h3
                            className="cart-delete-product"
                            onClick={() => deleteProduct(product)}
                        >
                            ❌
                        </h3>
                    </div>
                ))
            ) : (
                <p>No hay productos en el carrito.</p>
            )}
        </div>
    );
};

export default CartElements;
