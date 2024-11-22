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
        if (productsData) {
            setProducts(JSON.parse(productsData)); 
        } else {
            console.log("No hay productos en localStorage");
        }
    }, []);

    const handleBuy = (product) => {
        const isAuthenticated = sessionStorage.getItem('loggedInUser'); 
        if (!isAuthenticated) {
            navigate('/login'); // Si no está logueado, redirigir a login
        } else {
            buyProducts(product); // Si está logueado, ejecutar la compra
        }
    };

    return products.map((product) => {
        return (
            <div className="card" key={product.id}>
                <img src={product.img} alt="img-product-card" />
                <h3>{product.name}</h3>
                <h4>${product.price}</h4>
                <p>Quantity: {product.quanty}</p>
                <button onClick={() => handleBuy(product)}>Buy</button> {/* Usar handleBuy en lugar de buyProducts directamente */}
            </div>
        );
    });
};

export default Products;
