import {useContext } from "react"
import { Context } from "../../Context/Context"
import CartItemCounter from "./CartItemCounter"

const CartElements = () => {
    const { cart, deleteProduct } = useContext(Context); 

    return cart.map((product) => {
        return (
            <div className="product-card-container" key={product.id}>
                <img src={product.img} alt="product-card"/>
                <h3>{product.name}</h3>
                <CartItemCounter product={product}/>
                <h4>{product.price * product.quanty}</h4>
                <h3 className="cart-delete-product" onClick={() => deleteProduct(product)}>
                    ❌
                </h3>
            </div>
        )
    })

}

export default CartElements