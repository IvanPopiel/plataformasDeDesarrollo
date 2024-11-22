import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewProduct.css';

const NewProduct = () => {
  const [product, setProduct] = useState({
    id: '',
    name: '',
    price: '',
    quanty: '',
    img: ''
  });
  const navigate = useNavigate();

  const handleAddProduct = () => {
    const storedProducts = JSON.parse(localStorage.getItem('productsData')) || [];
    const newProduct = {
      ...product,
      id: new Date().getTime().toString() // Generate a unique id based on the current timestamp
    };

    const updatedProducts = [...storedProducts, newProduct];
    localStorage.setItem('productsData', JSON.stringify(updatedProducts));
    navigate('/admin');
  };

  return (
    <div className="new-product-container">
      <h2>Create New Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Product Image URL"
        value={product.img}
        onChange={(e) => setProduct({ ...product, img: e.target.value })}
      />
      <input
        type="number"
        placeholder="Product Price"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
      />
      <input
        type="number"
        placeholder="Product Quantity"
        value={product.quanty}
        onChange={(e) => setProduct({ ...product, quanty: e.target.value })}
      />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default NewProduct;
