import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); 
  const navigate = useNavigate();

  const loadUserData = () => {
    const storedData = localStorage.getItem('loginData');
    if (storedData) {
      return JSON.parse(storedData); 
    }
    return [];
  };

  const saveUserData = (usersData) => {
    localStorage.setItem('loginData', JSON.stringify(usersData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }

    const usersData = loadUserData(); 
    const existingUser = usersData.find((u) => u.username === username);

    if (existingUser) {
      setErrorMessage('El nombre de usuario ya está registrado.');
      return;
    }

    const newUser = {
      username,
      password,
      role: isAdmin ? 'Admin' : 'User', 
    };

    usersData.push(newUser); 
    saveUserData(usersData); 

    sessionStorage.setItem('loggedInUser', username);
    sessionStorage.setItem('userRole', newUser.role);
    setSuccessMessage('Te has registrado satisfactoriamente');

    setTimeout(() => {
      navigate('/');
    }, 2000); 
  };

  return (
    <div className="register-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Nombre de Usuario:</label>
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
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* Checkbox para seleccionar si es admin */}
        <div className="input-group">
          <label htmlFor="isAdmin">
            <input
              type="checkbox"
              id="isAdmin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            Eres admin (Solo marcar si eres el admin)?
          </label>
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Register;
