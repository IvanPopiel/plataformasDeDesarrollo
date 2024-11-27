import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewProduct.css';

const NewProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    quanty: '',
    img: ''
  });
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

 
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem('productsData')) || [];
    setProducts(storedProducts);
  }, []);

  
  const handleAddProduct = () => {
    const newProduct = {
      ...product,
      id: new Date().getTime().toString()
    };

    const updatedProducts = [...products, newProduct];
    localStorage.setItem('productsData', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    navigate('/admin');
  };

  // borrar
  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    localStorage.setItem('productsData', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  return (
    <div className="new-product-container">
      <h2>Crear un nuevo producto</h2>
      <button onClick={() => navigate('/admin')}>
        Volver a Admin
      </button>
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

      {/* prods */}
      <div className="products-list">

        <h3>Lista de Productos</h3>

        {products.length === 0 ? (
          <p>No hay productos para mostrar</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.img} alt={product.name} />
              <h4>{product.name}</h4>
              <p>Precio: ${product.price}</p>
              <p>Cantidad: {product.quanty}</p>
              <button onClick={() => navigate(`/admin/edit/${product.id}`)}>Editar</button>
              <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NewProduct;
