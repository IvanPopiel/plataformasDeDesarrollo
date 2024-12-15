import { useEffect, useState, useContext } from "react";
import { Context } from "../../Context/Context"; 
import { useNavigate } from "react-router-dom";
import "./Products.css";

const Products = () => {
    const { buyProducts } = useContext(Context);
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL;

    // Obtener productos de la API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_URL}/api/products`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, [API_URL]);


    const handleBuy = (product) => {
        const isAuthenticated = sessionStorage.getItem('user_id');
        if (!isAuthenticated) {
            navigate('/login'); 
        } else {
           
            if (product.quantity > 0) {
                buyProducts(product); // Llamar a la función de comprar productos
    
                // Actualizar el stock en el frontend solo si el producto tiene stock
                setProducts(prevProducts =>
                    prevProducts.map(p =>
                        p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
                    )
                );
            } else {
                alert("Este producto está agotado.");
            }
        }
    };
    
    return (
        <div className="product-card-container">
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <div className="card" key={product.id}>
                <img src={product.image_url} alt="img-product-card" />
                <h3>{product.name}</h3>
                <h4>${product.price}</h4>
                <h4>Stock: {product.quantity}</h4>
                <button onClick={() => handleBuy(product)}>Añadir al carrito</button>
              </div>
            ))
          ) : (
            <p>No se encontraron productos.</p>
          )}
        </div>
      );
      
};

export default Products;
