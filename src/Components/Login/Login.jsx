import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Cargar datos de login.json
  const loadUserData = async () => {
    try {
      const response = await fetch('/login.json');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error loading login data:', error);
      return [];
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const usersData = await loadUserData();

    // Buscar al usuario con las credenciales proporcionadas
    const user = usersData.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      // Almacenar en localStorage el estado de autenticación y el rol
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', username);
      localStorage.setItem('role', user.role); // Guardamos el rol del usuario

      // Redirigir al dashboard según el rol
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } else {
      setErrorMessage('Credenciales incorrectas. Intenta nuevamente.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
