import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditProduct.css';

const EditProduct = () => {
  const { productId } = useParams(); // Obtiene el ID del producto desde la URL
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const loadProductData = () => {
    const storedProducts = JSON.parse(localStorage.getItem('productsData')) || [];
    return storedProducts.find((p) => p.id === Number(productId)); 
  };
  

  useEffect(() => {
    const foundProduct = loadProductData();
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate('/admin');
    }
  }, [productId, navigate]);

  // Función para guardar los cambios del producto
  const handleSaveChanges = () => {
    const storedProducts = JSON.parse(localStorage.getItem('productsData')) || [];
    const updatedProducts = storedProducts.map((p) =>
      p.id === product.id ? { ...p, ...product } : p
    );
    
    // Guardamos el array de productos actualizado en localStorage
    localStorage.setItem('productsData', JSON.stringify(updatedProducts));
    
    // Redirigimos al administrador a la página de administración
    navigate('/admin');
  };

  // Si el producto aún no está cargado, mostramos un cargando
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
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
        value={product.img}
        onChange={(e) => setProduct({ ...product, img: e.target.value })}
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
        value={product.quanty}
        onChange={(e) => setProduct({ ...product, quanty: e.target.value })}
        placeholder="Cantidad en Stock"
        required
      />
      
      <button onClick={handleSaveChanges}>Guardar Cambios</button>
    </div>
  );
};

export default EditProduct;
