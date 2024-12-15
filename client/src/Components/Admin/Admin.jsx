import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Admin.css';

const API_URL = import.meta.env.VITE_API_URL;

const Admin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = sessionStorage.getItem("user_id");
          const response = await fetch(`${API_URL}/api/users/${userId}`, {
            method: "GET",
            credentials: 'include',
            headers: {
              "Content-Type": "application/json",
            },
          });
          
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
  
          const data = await response.json();
        
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
  
    fetchUserData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="admin-container">
        <h2>Panel de Administrador</h2>
        <button
          className="admin-button"
          onClick={() => navigate('/admin/new')}
        >
          Gestionar Productos
        </button>
        <button
          className="admin-button"
          onClick={() => navigate('/admin/usermanagement')}
        >
          Gestionar Usuarios
        </button>
      </div>
    </>
  );
};

export default Admin;
