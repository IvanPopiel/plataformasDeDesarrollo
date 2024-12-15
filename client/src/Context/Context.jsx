import { createContext, useState, useEffect } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL;

    // Obtener el user_id desde la sesión
    const user_id = sessionStorage.getItem('user_id');

    // Cargar productos desde la API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_URL}/api/products`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                } else {
                    console.error("Error al obtener productos:", response.statusText);
                }
            } catch (error) {
                console.error("Error al obtener productos:", error);
            }
        };

        const fetchCart = async () => {
            if (user_id) {
                try {
                    const response = await fetch(`${API_URL}/api/carts/`, {
                        method: 'GET',
                        credentials: 'include',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
        
                    if (response.ok) {
                        const data = await response.json();
                        setCart(data); 
                    } else if (response.status === 404) {
                        setCart(null);
                    } else {
                        console.error("Error al obtener el carrito:", response.statusText);
                    }
                } catch (error) {
                    console.error("Error al obtener el carrito:", error);
                }
            }
        };
        

        fetchProducts();
        fetchCart();
    }, [API_URL, user_id]);


    // Función para actualizar el carrito después de la compra
    const fetchCart = async () => {
        if (user_id) {
            try {
                const response = await fetch(`${API_URL}/api/carts/`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (response.ok) {
                    const data = await response.json();
                    setCart(data); //
                } else if (response.status === 404) {
                    setCart(null); 
                } else {
                    console.error("Error al obtener el carrito:", response.statusText);
                }
            } catch (error) {
                console.error("Error al obtener el carrito:", error);
            }
        }
    };
    

    // Comprar productos (añadir al carrito)
    const buyProducts = async (product) => {
        if (!user_id) {
            console.error("Usuario no autenticado");
            return;
        }
        
        const productId = product.id || product.productId;
        try {
            const response = await fetch(`${API_URL}/api/carts/add`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user_id,
                    product_id: productId,
                }),
            });

            if (response.ok) {
                await fetchCart(); 
            } else {
                console.error("Error al añadir producto al carrito:", response.statusText);
            }
        } catch (error) {
            console.error("Error al añadir producto al carrito:", error);
        }
    };

    // Eliminar un producto del carrito
    const deleteProduct = async (product) => {
        if (!user_id) {
            console.error("Usuario no autenticado");
            return;
        }
        try {
            const response = await fetch(`${API_URL}/api/carts/${user_id}/${product.productId}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                await fetchCart(); 
            } else {
                console.error("Error al eliminar producto del carrito:", response.statusText);
            }
        } catch (error) {
            console.error("Error al eliminar producto del carrito:", error);
        }
    };

    // Reducir la cantidad de un producto en el carrito
    const decreaseProduct = async (product) => {
        if (product.quantity > 1) {
            const productId = product.id || product.productId;
           try {
                const response = await fetch(`${API_URL}/api/carts/remove`, {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        user_id,
                        product_id: productId,
                    }),
                });

                    console.log(response);
                if (response.ok) {
                    await fetchCart(); 
                } else {
                    console.error("Error al reducir cantidad del producto:", response.statusText);
                }
            } catch (error) {
                console.error("Error al reducir cantidad del producto:", error);
            }
        } else {
            await deleteProduct(product); // Eliminar el producto si su cantidad es 1
        }
    };

    return (
        <Context.Provider
            value={{
                cart,
                setCart,
                buyProducts,
                decreaseProduct,
                deleteProduct,
                products,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
