import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Función para cargar los datos de los usuarios desde localStorage
  const loadUserData = () => {
    const loginData = localStorage.getItem('usersData');
    if (loginData) {
      return JSON.parse(loginData); 
    }
    return []; 
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    const usersData = loadUserData();

    const user = usersData.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      sessionStorage.setItem('loggedInUser', username);
      sessionStorage.setItem('userRole', user.role); 
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      setErrorMessage('Credenciales incorrectas. Intenta nuevamente.');
    }
  };

  return (
    <div className="login-container">
      <h2>Inicio de Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Nombre Usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Iniciar Sesion</button>
      </form>
      <p className="register-link">
        ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
      </p>
    </div>
  );
};

export default Login;
