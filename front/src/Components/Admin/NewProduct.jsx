import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewProduct.css';
import Navbar from '../NavBar/NavBar';

const NewProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    quanty: '',
    img: ''
  });
  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('loggedInUser');
    const userRole = sessionStorage.getItem('userRole');
    if (!isAuthenticated || userRole !== 'admin') {
      navigate('/'); 
    }

    const storedProducts = JSON.parse(localStorage.getItem('productsData')) || [];
    setProducts(storedProducts);
  }, [navigate]);

  const validate = () => {
    const newErrors = {};

    if (!product.name.trim()) {
      newErrors.name = 'El nombre del producto es obligatorio.';
    } else if (product.name.length < 3) {
      newErrors.name = 'El nombre debe tener al menos 3 caracteres.';
    }

    if (!product.price) {
      newErrors.price = 'El precio es obligatorio.';
    } else if (isNaN(product.price) || parseFloat(product.price) <= 0) {
      newErrors.price = 'El precio debe ser un número positivo.';
    }

    if (!product.quanty) {
      newErrors.quanty = 'La cantidad es obligatoria.';
    } else if (!Number.isInteger(Number(product.quanty)) || parseInt(product.quanty) <= 0) {
      newErrors.quanty = 'La cantidad debe ser un número entero positivo.';
    }

    if (!product.img.trim()) {
      newErrors.img = 'La URL de la imagen es obligatoria.';
    } else if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(product.img)) {
      newErrors.img = 'La URL de la imagen debe ser válida.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleAddProduct = () => {
    if (!validate()) 
      return; 
  
    const lastId = products.length > 0 ? Math.max(...products.map((p) => p.id)) : 0;
  
    const newProduct = {
      id: lastId + 1,
      ...product
    };
  
    const updatedProducts = [...products, newProduct];
    localStorage.setItem('productsData', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    navigate('/admin');
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));

    validate();
  };

  const handleDeleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    localStorage.setItem('productsData', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  return (
    <>
      <Navbar />
    <div className="new-product-container">
      <h2>Crear un nuevo producto</h2>
      <button onClick={() => navigate('/admin')}>Volver a Admin</button>
      <input
        type="text"
        placeholder="Nombre del Producto"
        value={product.name}
        onChange={(e) => setProduct({ ...product, name: e.target.value })}
      />
      {errors.name && <div className="error">{errors.name}</div>}
      <input
        type="text"
        placeholder="Imagen URL"
        value={product.img}
        onChange={(e) => setProduct({ ...product, img: e.target.value })}
      />
      {errors.img && <div className="error">{errors.img}</div>}
      <input
        type="number"
        placeholder="Precio del Producto"
        value={product.price}
        onChange={(e) => setProduct({ ...product, price: e.target.value })}
      />
      {errors.price && <div className="error">{errors.price}</div>}
      <input
        type="number"
        placeholder="Stock del Producto"
        value={product.quanty}
        onChange={(e) => setProduct({ ...product, quanty: e.target.value })}
      />
      {errors.quanty && <div className="error">{errors.quanty}</div>}
      <button onClick={handleAddProduct}>Agregar Producto</button>
      
      <section className="table-product-container">
        <h3>Lista de Productos</h3>
        {products.length === 0 ? (
          <p>No hay productos para mostrar</p>
        ) : (
          <table className="product-table">
            <thead>
              <tr>
                <th>Portada</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td><img src={product.img} alt={product.name} className="product-img" /></td>
                  <td data-label ="Nombre">{product.name}</td>
                  <td data-label ="Precio">${product.price}</td>
                  <td data-label = "Cantidad">{product.quanty}</td>
                  <td data-label="Acciones">
                    <button onClick={() => navigate(`/admin/edit/${product.id}`)}>Editar</button>
                    <button onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
    </>
  );
};

export default NewProduct;
