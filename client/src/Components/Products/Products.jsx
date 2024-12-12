import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context/Context";
import "./products.css";

const Products = () => {
    const [products, setProducts] = useState([]);
    const { buyProducts } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const productsData = localStorage.getItem('productsData');
        const isAuthenticated = sessionStorage.getItem('loggedInUser');
        const userRole = sessionStorage.getItem('userRole');
        if (productsData) {
            setProducts(JSON.parse(productsData)); 
        } else {
            console.log("No hay productos en la base de datos");
        }

        if (isAuthenticated && userRole == 'admin') {
            navigate('/admin'); 
        }
    }, []);

    const handleBuy = (product) => {
        const isAuthenticated = sessionStorage.getItem('loggedInUser'); 
        if (!isAuthenticated) {
            navigate('/login'); 
        } else {
            
            setProducts(prevProducts => {
                const updatedProducts = prevProducts.map(p => 
                    p.id === product.id 
                    ? { ...p, quanty: p.quanty - 1 } 
                    : p
                );
                
                // Guardar los productos actualizados en localStorage
                localStorage.setItem('productsData', JSON.stringify(updatedProducts));
                return updatedProducts;
            });
            buyProducts(product); 
        }
    };

    return products.map((product) => {
        return (
            <div className="card" key={product.id}>
                <img src={product.img} alt="img-product-card" />
                <h3>{product.name}</h3>
                <h4>${product.price}</h4>
                <h4>Stock: {product.quanty}</h4>
                <button onClick={() => handleBuy(product)}>Anadir al carrito</button>
            </div>
        );
    });
};

export default Products;
