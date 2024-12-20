import { Link } from 'react-router-dom';
import './Navbar.css';

const NavBar = () => {
  const isAuthenticated = sessionStorage.getItem('loggedInUser');
  const userRole = isAuthenticated ? sessionStorage.getItem('userRole') : null;
  const username = isAuthenticated ? sessionStorage.getItem('loggedInUser') : null;

  const handleLogout = () => {
    sessionStorage.removeItem('loggedInUser');
    sessionStorage.removeItem('userRole');
    window.location.reload();
  };

  return (
    <div className="nav-container">
      <nav className="navbar">
        <Link to="/" className="navbar-logo-container">
          <h1 className="navbar-logo">GameStore</h1>
        </Link>

        <div className="navbar-actions">
          {userRole !== 'admin' && (
            <Link to="/cart" className="navbar-cart">
              🛒
            </Link>
          )}

          <div className="login-buttons">
            {isAuthenticated ? (
              <div className="user-info">
                <span className="navbar-username">Hola, {username}</span>
                <button onClick={handleLogout} className="navbar-logout">
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="navbar-login">
                  Iniciar Sesión
                </Link>
                <Link to="/register" className="navbar-register">
                  Registro
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
