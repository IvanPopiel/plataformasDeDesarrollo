import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NewProduct.css';
import Navbar from '../Navbar/Navbar';

const NewProduct = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [product, setProduct] = useState({
    name: '',
    price: '',
    quanty: '',
    img: ''
  });
  const [errors, setErrors] = useState({});
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Función para obtener productos desde la API
  const fetchProducts = async () => {
    const response = await fetch(`${API_URL}/api/products`); 
    if (response.ok) {
      const data = await response.json();
      setProducts(data);
    } else {
      console.error('Error fetching products');
    }
  };

  useEffect(() => {
    const userId = sessionStorage.getItem("user_id");
    if (!userId) {
      navigate("/"); 
      return;
    }

    fetchProducts(); // Carga los productos desde la API cuando el componente se monta
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

  // Función para agregar un producto
  const handleAddProduct = async () => {
    if (!validate()) 
      return;

    const newProduct = {
      ...product
    };

    const response = await fetch(`${API_URL}/api/products`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });

    if (response.ok) {
      fetchProducts(); 
      navigate('/admin/new');
    } else {
      console.error('Error adding product');
    }
  };

  // Función para eliminar un producto
  const handleDeleteProduct = async (id) => {
    const response = await fetch(`${API_URL}/api/products/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (response.ok) {
      fetchProducts(); 
    } else {
      console.error('Error deleting product');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));

    validate();
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
          onChange={handleChange}
          name="name"
        />
        {errors.name && <div className="error">{errors.name}</div>}
        <input
          type="text"
          placeholder="Imagen URL"
          value={product.img}
          onChange={handleChange}
          name="img"
        />
        {errors.img && <div className="error">{errors.img}</div>}
        <input
          type="number"
          placeholder="Precio del Producto"
          value={product.price}
          onChange={handleChange}
          name="price"
        />
        {errors.price && <div className="error">{errors.price}</div>}
        <input
          type="number"
          placeholder="Stock del Producto"
          value={product.quanty}
          onChange={handleChange}
          name="quanty"
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
                    <td><img src={product.image_url} alt={product.name} className="product-img" /></td>
                    <td data-label="Nombre">{product.name}</td>
                    <td data-label="Precio">${product.price}</td>
                    <td data-label="Cantidad">{product.quantity}</td>
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
