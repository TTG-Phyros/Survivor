import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import './Events.css';
import { LatLngExpression } from 'leaflet';
import { useNavigate } from 'react-router-dom';
import * as api from './api/Api.js';
import L from 'leaflet';

const position: LatLngExpression = [52.978, -0.0235]; // Default map center

const Event: React.FC = () => {
  const navigate = useNavigate();
  
  const [mapEvents, setMapEvents] = useState<{ id: number; position: LatLngExpression; name: string; date: Date; duration: number; maxParticipants: number; type: string; secondaryId: number }[]>([]);
  const [modalState, setModalState] = useState({
    isOpen: false,
    address: '',
    name: '',
    date: new Date(),
    duration: 0,
    maxParticipants: 0,
    type: '',
    id: 0,
    secondaryId: 0
  });

  const handleAddMapEvent = async () => {
    const { address, name, date, duration, maxParticipants, type, id, secondaryId } = modalState;
    if (address && name) {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`);
        const results = await response.json();
        if (results && results.length > 0) {
          const lat = parseFloat(results[0].lat);
          const lon = parseFloat(results[0].lon);
          const newEvent = {
            id,
            position: [lat, lon] as LatLngExpression,
            name,
            date,
            duration,
            maxParticipants,
            type,
            secondaryId
          };
          setMapEvents(prevEvents => [...prevEvents, newEvent]);
          closeModal();
        } else {
          alert('Address not found. Please check and try again.');
        }
      } catch (error) {
        console.error('Error fetching address:', error);
        alert('An error occurred while fetching the address. Please try again later.');
      }
    }
  };

  const renderEvents = (date: Date) => {
    return mapEvents
      .filter(event => event.date.toDateString() === date.toDateString())
      .map((event, index) => (
        <div key={index} className="event">
          {event.name}
        </div>
      ));
  };

  const openModal = () => setModalState(prev => ({ ...prev, isOpen: true }));
  const closeModal = () => setModalState(prev => ({ ...prev, isOpen: false }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setModalState(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : type === 'date' ? new Date(value) : value
    }));
  };

  return (
    <div className='container'>
      <header className="navbar">
        <div className="navbar-logo">Soul Connection</div>
        <nav className="navbar-links">
          <button className="navbar-link" onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button className="navbar-link" onClick={() => navigate("/coaches")}>Coaches</button>
          <button className="navbar-link" onClick={() => navigate("/customers")}>Customers</button>
          <button className="navbar-link" onClick={() => navigate("/tips")}>Tips</button>
          <button className="navbar-link active" onClick={() => navigate("/events")}>Events</button>
          <button className="navbar-link" onClick={() => navigate("/clothes")}>Clothes</button>
          <button className="navbar-link" onClick={() => navigate("/compatibility")}>Compatibility</button>
        </nav>
        <div className="navbar-actions">
          <button className="navbar-icon">🔔</button>
          <button className="navbar-icon">🇺🇸</button>
          <button className="navbar-icon" onClick={() => api.disconnectEmployee()}>👤</button>
        </div>
      </header>

      <div className="event-section" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
        <h1>Events</h1>
        <div className="button-container">
          <button className="add-event-button" onClick={openModal}>Add Map Event</button>
        </div>

        {/* Calendar Section */}
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
          <Calendar tileContent={({ date, view }) => view === 'month' && renderEvents(date)} />
        </div>

        {/* Map Section */}
        <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', height: '400px' }}>
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {mapEvents.map((event, index) => (
              <Marker key={index} position={event.position} icon={L.icon({
                iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                iconSize: [32, 32],
                iconAnchor: [16, 32],
              })}>
                <Popup>
                  <div>
                    <strong>{event.name}</strong><br />
                    Date: {event.date.toLocaleDateString()}<br />
                    Duration: {event.duration} hours<br />
                    Max Participants: {event.maxParticipants}<br />
                    Type: {event.type}<br />
                    ID: {event.id}, Secondary ID: {event.secondaryId}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      <Modal
        isOpen={modalState.isOpen}
        onRequestClose={closeModal}
        contentLabel="Add Map Event"
        className="event-modal"
      >
        <h2>Add Map Event</h2>
        {Object.entries({
          Name: 'name',
          Address: 'address',
          Date: 'date',
          Duration: 'duration',
          MaxParticipants: 'maxParticipants',
          Type: 'type',
          ID: 'id',
          SecondaryID: 'secondaryId'
        }).map(([label, name]) => (
          <label key={name}>
            {label}:
            <input
              type={name === 'date' ? 'date' : 'text'}
              name={name}
              value={
                name === 'date'
                  ? (modalState[name as keyof typeof modalState] as Date).toISOString().slice(0, 10)
                  : modalState[name as keyof typeof modalState] as string
              }
              onChange={handleChange}
            />
          </label>
        ))}
        <button onClick={handleAddMapEvent}>Add</button>
        <button onClick={closeModal}>Cancel</button>
      </Modal>
    </div>
  );
};

export default Event;
