// Navbar.tsx
import { useNavigate } from "react-router-dom";
import { disconnectEmployee } from './api/Api.js'
import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="navbar-logo">Soul Connection</div>
      <nav className="navbar-links">
        <button className="navbar-link" onClick={() => {navigate("/dashboard"); window.location.reload()}}>Dashboard</button>
        <button className="navbar-link" onClick={() => {navigate("/coaches"); window.location.reload()}}>Coaches</button>
        <button className="navbar-link" onClick={() => {navigate("/customers"); window.location.reload()}}>Customers</button>
        <button className="navbar-link" onClick={() => {navigate("/tips"); window.location.reload()}}>Tips</button>
        <button className="navbar-link" onClick={() => {navigate("/events"); window.location.reload()}}>Events</button>
        <button className="navbar-link" onClick={() => {navigate("/clothes"); window.location.reload()}}>Clothes</button>
        <button className="navbar-link active" onClick={() => {navigate("/compatibility"); window.location.reload()}}>Compatibility</button>
      </nav>
      <div className="navbar-actions">
        <button className="navbar-icon">🔔</button>
        <button className="navbar-icon">🇺🇸</button>
        <button className="navbar-icon" onClick={() => {disconnectEmployee(); window.location.reload()}}>👤</button>
      </div>
    </header>
  );
};

export default Navbar;
