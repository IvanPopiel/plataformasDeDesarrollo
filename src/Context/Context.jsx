import { createContext, useState, useEffect } from "react";

// Crear el contexto
export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Función para cargar el carrito desde localStorage
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart)); // Cargar el carrito desde localStorage
        }
    }, []);

    // Función para agregar productos al carrito
    const buyProducts = (product) => {
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

    // Guardar el carrito actualizado en localStorage cada vez que cambie
    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart)); // Guardar carrito en localStorage
        }
    }, [cart]);

    return (
        <Context.Provider
            value={{
                cart,
                setCart,
                buyProducts,
                decreaseProduct,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
