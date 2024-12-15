import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditProduct.css';
import Navbar from '../NavBar/NavBar';

const EditProduct = () => {
  const { productId } = useParams(); 
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const loadProductData = async () => {
    const API_URL = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${API_URL}/api/products/${productId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching product: ${response.statusText}`);
      }

      const productData = await response.json();
      setProduct(productData);
    } catch (error) {
      console.error('Error loading product:', error);
      navigate('/admin'); 
    }
  };

  useEffect(() => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId) {
      navigate("/"); 
      return;
    }

    loadProductData();
  }, [productId, navigate]);

  // Función para guardar los cambios del producto
  const handleSaveChanges = async () => {
    const API_URL = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${API_URL}/api/products/${product.id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: product.name,
          imgage_url: product.image_url,
          price: product.price,
          quantity: product.quantity,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error saving product: ${response.statusText}`);
      }

      const updatedProduct = await response.json();
      setProduct(updatedProduct); 

      navigate('/admin/new'); 
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  // Si el producto aún no está cargado, mostramos un cargando
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="edit-product-container">
        <h2>Editar Producto</h2>

        <input
          type="text"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          placeholder="Nombre del Producto"
          required
        />

        <input
          type="text"
          value={product.image_url}
          onChange={(e) => setProduct({ ...product, image_url: e.target.value })}
          placeholder="URL de la Imagen"
          required
        />

        <input
          type="number"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          placeholder="Precio del Producto"
          required
        />

        <input
          type="number"
          value={product.quantity}
          onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
          placeholder="Cantidad en Stock"
          required
        />

        <div className="button-group">
          <button onClick={handleSaveChanges}>Guardar Cambios</button>
          <button className="back-button" onClick={() => navigate(-1)}>Volver Atrás</button>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
