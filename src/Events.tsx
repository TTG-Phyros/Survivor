import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './Events.css';
import { LatLngExpression } from 'leaflet';
import { useNavigate } from 'react-router-dom';
import * as api from './api/Api.js'

const position: LatLngExpression = [52.978, -0.0235]; // on spawn à Boston les frr

const Event: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <header className="navbar">
        <div className="navbar-logo">Soul Connection</div>
        <nav className="navbar-links">
          <button className="navbar-link active" onClick={() => {navigate("/dashboard"); window.location.reload()}}>Dashboard</button>
          <button className="navbar-link" onClick={() => {navigate("/coaches"); window.location.reload()}}>Coaches</button>
          <button className="navbar-link" onClick={() => {navigate("/customers"); window.location.reload()}}>Customers</button>
          <button className="navbar-link" onClick={() => {navigate("/tips"); window.location.reload()}}>Tips</button>
          <button className="navbar-link" onClick={() => {navigate("/events"); window.location.reload()}}>Events</button>
          <button className="navbar-link" onClick={() => {navigate("/clothes"); window.location.reload()}}>Clothes</button>
          <button className="navbar-link" onClick={() => {navigate("/compatibility"); window.location.reload()}}>Compatibility</button>
        </nav>
        <div className="navbar-actions">
          <button className="navbar-icon">🔔</button>
          <button className="navbar-icon">🇺🇸</button>
          <button className="navbar-icon" onClick={() => {api.disconnectEmployee(); window.location.reload()}}>👤</button>
        </div>
      </header>
      <div className="Event-container">
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>Boston, UK</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Event;
