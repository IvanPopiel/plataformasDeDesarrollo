import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../NavBar/NavBar';
import './Admin.css';

const Admin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('loggedInUser');
    const userRole = sessionStorage.getItem('userRole');
    if (!isAuthenticated || userRole !== 'admin') {
      navigate('/'); 
    }
  }, [navigate]);

  return (
    <div className="admin-container">
      <Navbar /> 
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
