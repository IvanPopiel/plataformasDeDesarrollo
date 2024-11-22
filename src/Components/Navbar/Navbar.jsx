import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {

  const isAuthenticated = sessionStorage.getItem('loggedInUser');
  const username = isAuthenticated ? sessionStorage.getItem('loggedInUser') : null;

  const handleLogout = () => {
    sessionStorage.removeItem('loggedInUser'); 
    sessionStorage.removeItem('userRole'); 
    window.location.reload();  
  };

  return (
    <div className="nav-container">
      <nav className="navbar">
        <Link to='/'>
          <h1 className="navbar-logo">shop.</h1>
        </Link>
        <Link to='/cart'>
          <h2 className="navbar-cart">🛒</h2>
        </Link>

        {/* Botones de Login/Registro o Nombre de usuario y Logout */}
        <div className="login-buttons">
          {isAuthenticated ? (
            <div className="user-info">
              <span className="navbar-username">Hola, {username}</span>
              <button onClick={handleLogout} className="navbar-logout">Logout</button>
            </div>
          ) : (
            <>
              <Link to='/login' className="navbar-login">Login</Link>
              <Link to='/register' className="navbar-register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
