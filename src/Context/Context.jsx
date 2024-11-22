import { createContext, useState } from "react";

// Crear el contexto
export const Context = createContext();

const ContextProvider = ({ children }) => {
    // Estado para manejar los productos en el carrito
    const [cart, setCart] = useState([]);

    // Función para agregar productos al carrito
    const buyProducts = (product) => {
        // Buscar si el producto ya existe en el carrito
        const productRepeat = cart.find((item) => item.id === product.id);

        if (productRepeat) {
            // Si el producto ya está, incrementar la cantidad
            setCart(
                cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quanty: productRepeat.quanty + 1 }
                        : item
                )
            );
        } else {
            // Si el producto no está, agregarlo al carrito con cantidad inicial de 1
            setCart([...cart, { ...product, quanty: 1 }]);
        }
    };

    // Función para disminuir la cantidad de un producto
    const decreaseProduct = (product) => {
        const productRepeat = cart.find((item) => item.id === product.id);

        if (productRepeat && productRepeat.quanty > 1) {
            setCart(
                cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quanty: productRepeat.quanty - 1 }
                        : item
                )
            );
        } else {
            // Si la cantidad es 1, eliminar el producto del carrito
            setCart(cart.filter((item) => item.id !== product.id));
        }
    };

    // Función para eliminar un producto completamente del carrito
    const removeProduct = (productId) => {
        setCart(cart.filter((item) => item.id !== productId));
    };

    // Función para vaciar el carrito
    const clearCart = () => {
        setCart([]);
    };

    return (
        <Context.Provider
            value={{
                cart,
                setCart,
                buyProducts,
                decreaseProduct,
                removeProduct,
                clearCart,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
