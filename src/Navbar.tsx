// Navbar.tsx
import { useNavigate, useLocation } from "react-router-dom";
import { disconnectEmployee } from './api/Api.js'
import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="navbar">
      <div className="navbar-logo">Soul Connection</div>
      <nav className="navbar-links">
        <button className={`navbar-link ${location.pathname === '/dashboard' || location.pathname === '/' ? 'active' : ''}`} onClick={() => navigate("/dashboard")}>
          Dashboard
        </button>
        <button className={`navbar-link ${location.pathname === '/coaches' ? 'active' : ''}`} onClick={() => navigate("/coaches")}>
          Coaches
        </button>
        <button className={`navbar-link ${location.pathname === '/customers' ? 'active' : ''}`} onClick={() => navigate("/customers")}>
          Customers
        </button>
        <button className={`navbar-link ${location.pathname === '/tips' ? 'active' : ''}`} onClick={() => navigate("/tips")}>
          Tips
        </button>
        <button className={`navbar-link ${location.pathname === '/events' ? 'active' : ''}`} onClick={() => navigate("/events")}>
          Events
        </button>
        <button className={`navbar-link ${location.pathname === '/clothes' ? 'active' : ''}`} onClick={() => navigate("/clothes")}>
          Clothes
        </button>
        <button className={`navbar-link ${location.pathname === '/compatibility' ? 'active' : ''}`} onClick={() => navigate("/compatibility")}>
          Compatibility
        </button>
      </nav>
      <div className="navbar-actions">
        <button className="navbar-icon">🔔</button>
        <button className="navbar-icon">🇺🇸</button>
        <button className="navbar-icon" onClick={()=>disconnectEmployee()}>👤</button>
      </div>
    </header>
  );
};

export default Navbar;
