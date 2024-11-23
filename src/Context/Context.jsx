import { createContext, useState, useEffect } from "react";

// Crear el contexto
export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);

    // Cargar el carrito y los productos desde localStorage al inicializar
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        const storedProducts = localStorage.getItem("productsData");
        if (storedCart) {
            setCart(JSON.parse(storedCart)); // Cargar el carrito desde localStorage
        }
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts)); // Cargar productos desde localStorage
        }
    }, []);

    // Sincronizar productos con localStorage
    const syncProducts = (updatedProducts) => {
        localStorage.setItem("productsData", JSON.stringify(updatedProducts));
        setProducts(updatedProducts);
    };

    // Función para agregar productos al carrito
    const buyProducts = (product) => {
        const productRepeat = cart.find((item) => item.id === product.id);
        const updatedProducts = [...products];
        const productInStock = updatedProducts.find((item) => item.id === product.id);

        if (productInStock && productInStock.quanty > 0) {
            // Si hay stock, reducirlo
            productInStock.quanty -= 1;

            if (productRepeat) {
                // Si el producto ya está en el carrito, incrementar su cantidad
                setCart(
                    cart.map((item) =>
                        item.id === product.id
                            ? { ...item, quanty: productRepeat.quanty + 1 }
                            : item
                    )
                );
            } else {
                // Si no está en el carrito, agregarlo con cantidad inicial de 1
                setCart([...cart, { ...product, quanty: 1 }]);
            }

            syncProducts(updatedProducts); // Actualizar productos en localStorage
        } else {
            alert("No hay suficiente stock");
        }
    };

    // Función para disminuir la cantidad de un producto
    const decreaseProduct = (product) => {
        const productRepeat = cart.find((item) => item.id === product.id);
        const updatedProducts = [...products];
        const productInStock = updatedProducts.find((item) => item.id === product.id);

        if (productRepeat) {
            if (productRepeat.quanty > 1) {
                // Disminuir la cantidad en el carrito
                setCart(
                    cart.map((item) =>
                        item.id === product.id
                            ? { ...item, quanty: productRepeat.quanty - 1 }
                            : item
                    )
                );

                // Aumentar el stock en productos
                if (productInStock) {
                    productInStock.quanty += 1;
                }
            } else {
                // Si la cantidad es 1, eliminar el producto del carrito
                setCart(cart.filter((item) => item.id !== product.id));

                // Aumentar el stock en productos
                if (productInStock) {
                    productInStock.quanty += 1;
                }
            }

            syncProducts(updatedProducts); // Actualizar productos en localStorage
        }
    };

    // Guardar el carrito actualizado en localStorage cada vez que cambie
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart)); // Guardar carrito en localStorage
    }, [cart]);

    return (
        <Context.Provider
            value={{
                cart,
                setCart,
                buyProducts,
                decreaseProduct,
                products,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
