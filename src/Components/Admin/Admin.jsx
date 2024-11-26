import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('loggedInUser');
    const userRole = localStorage.getItem('userRole');
    console.log(isAuthenticated)
    console.log(userRole)

    if (!isAuthenticated || userRole !== 'admin') {
      navigate('/'); 
    }
  }, [navigate]);



  return (
    <div className="admin-container">
      <h2>Panel de Administrador</h2>
      
      <button className="admin-button" onClick={() => navigate('/admin/new')}>
        Crear Producto
      </button>
      <button className="admin-button" onClick={() => navigate('/admin/usermanagement')}>
        Gestionar Usuarios
      </button>



    </div>
    
  );
};

export default Admin;
