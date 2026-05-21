import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ isLoggedIn, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🛍️ Amazon Recommendations
        </Link>
        <div className="navbar-menu">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/trending" className="navbar-link">Trending</Link>
          <Link to="/cart" className="navbar-link">Cart</Link>
          {isLoggedIn ? (
            <>
              <Link to="/orders" className="navbar-link">Orders</Link>
              <button onClick={onLogout} className="navbar-link logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/register" className="navbar-link">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}