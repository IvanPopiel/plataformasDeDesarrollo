import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('loggedInUser');
    const userRole = localStorage.getItem('userRole');
    console.log(isAuthenticated)
    console.log(userRole)

    if (!isAuthenticated || userRole !== 'Admin') {
      navigate('/'); 
    } else {
      const storedProducts = JSON.parse(localStorage.getItem('productsData')) || [];
      setProducts(storedProducts);
    }
  }, [navigate]);

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    localStorage.setItem('productsData', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  return (
    <div className="admin-container">
      <h2>Admin Panel</h2>
      
      <button className="create-product-button" onClick={() => navigate('/admin/new')}>
        Crear Producto
      </button>
      <button className="create-product-button" onClick={() => navigate('/admin/usermanagement')}>
        Gestionar Usuarios
      </button>


      <div className="products-list">
        <h3>Product List</h3>
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.img} alt={product.name} />
              <h4>{product.name}</h4>
              <p>Price: ${product.price}</p>
              <p>Quantity: {product.quanty}</p>

              <button onClick={() => navigate(`/admin/edit/${product.id}`)}>Editar</button>
              <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Admin;
