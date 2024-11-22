import { Link } from 'react-router-dom'
import './NavBar.css'

const NavBar = () => {
  return (
    <div className="nav-container">
      <nav className="navbar">
        <Link to='/'>
          <h1 className="navbar-logo">shop.</h1>
        </Link>
        <Link to='/cart'>
          <h2 className="navbar-cart">🛒</h2>
        </Link>
        {/* Botones de login */}
        <div className="login-buttons">
          <Link to='/login' className="navbar-login">Login</Link>
          <Link to='/register' className="navbar-register">Register</Link>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
