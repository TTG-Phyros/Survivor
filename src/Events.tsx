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

const position: LatLngExpression = [52.978, -0.0235]; // Boston les frères

const Event: React.FC = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState<{ date: Date; name: string }[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEventDate, setNewEventDate] = useState<Date>(new Date());
  const [newEventName, setNewEventName] = useState('');
  const [isMapEventModalOpen, setIsMapEventModalOpen] = useState(false);
  const [mapEvents, setMapEvents] = useState<{ id: number; position: LatLngExpression; name: string; date: Date; duration: number; maxParticipants: number; type: string; secondaryId: number }[]>([]);
  const [newMapEventAddress, setNewMapEventAddress] = useState('');
  const [newMapEventName, setNewMapEventName] = useState('');
  const [newMapEventDate, setNewMapEventDate] = useState<Date>(new Date());
  const [newMapEventDuration, setNewMapEventDuration] = useState<number>(0);
  const [newMapEventMaxParticipants, setNewMapEventMaxParticipants] = useState<number>(0);
  const [newMapEventType, setNewMapEventType] = useState<string>('');
  const [newMapEventId, setNewMapEventId] = useState<number>(0);
  const [newMapEventSecondaryId, setNewMapEventSecondaryId] = useState<number>(0);

  const handleAddEvent = () => {
    if (newEventName) {
      setEvents([...events, { date: newEventDate, name: newEventName }]);
      setIsModalOpen(false);
      setNewEventName('');
    }
  };

  const handleAddMapEvent = () => {
    if (newMapEventAddress && newMapEventName) {
      const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(newMapEventAddress)}&format=json`;
      fetch(nominatimUrl)
        .then(response => response.json())
        .then(results => {
          if (results && results.length > 0) {
            const lat = parseFloat(results[0].lat);
            const lon = parseFloat(results[0].lon);
            setMapEvents([...mapEvents, {
              id: newMapEventId,
              position: [lat, lon],
              name: newMapEventName,
              date: newMapEventDate,
              duration: newMapEventDuration,
              maxParticipants: newMapEventMaxParticipants,
              type: newMapEventType,
              secondaryId: newMapEventSecondaryId
            }]);
            setIsMapEventModalOpen(false);
            setNewMapEventAddress('');
            setNewMapEventName('');
            setNewMapEventDuration(0);
            setNewMapEventMaxParticipants(0);
            setNewMapEventType('');
            setNewMapEventId(0);
            setNewMapEventSecondaryId(0);
          } else {
            alert('Adresse non trouvée. Veuillez vérifier et réessayer.');
          }
        });
    }
  };

  const renderEvents = (date: Date) => {
    return events
      .filter(event => event.date.toDateString() === date.toDateString())
      .map((event, index) => (
        <div key={index} className="event">
          {event.name}
        </div>
      ));
  };

  return (
    <div>
      <header className="navbar">
        <div className="navbar-logo">Soul Connection</div>
        <nav className="navbar-links">
          <button className="navbar-link" onClick={() => { navigate("/dashboard"); window.location.reload() }}>Dashboard</button>
          <button className="navbar-link" onClick={() => { navigate("/coaches"); window.location.reload() }}>Coaches</button>
          <button className="navbar-link" onClick={() => { navigate("/customers"); window.location.reload() }}>Customers</button>
          <button className="navbar-link" onClick={() => { navigate("/tips"); window.location.reload() }}>Tips</button>
          <button className="navbar-link active" onClick={() => { navigate("/events"); window.location.reload() }}>Events</button>
          <button className="navbar-link" onClick={() => { navigate("/clothes"); window.location.reload() }}>Clothes</button>
          <button className="navbar-link" onClick={() => { navigate("/compatibility"); window.location.reload() }}>Compatibility</button>
        </nav>
        <div className="navbar-actions">
          <button className="navbar-icon">🔔</button>
          <button className="navbar-icon">🇺🇸</button>
          <button className="navbar-icon" onClick={() => { api.disconnectEmployee(); window.location.reload() }}>👤</button>
        </div>
      </header>

      <div className="event-section">
        <h1>Events</h1>
        <div className="button-container">
          <button className="add-event-button" onClick={() => setIsModalOpen(true)}>Add Event</button>
          <button className="add-event-button" onClick={() => setIsMapEventModalOpen(true)}>Add Map Event</button>
        </div>
        <Calendar
          tileContent={({ date, view }) => view === 'month' && renderEvents(date)}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Add Event"
        className="event-modal"
      >
        <h2>Add Event</h2>
        <label>
          Event Name:
          <input
            type="text"
            value={newEventName}
            onChange={(e) => setNewEventName(e.target.value)}
          />
        </label>
        <label>
          Event Date:
          <input
            type="date"
            value={newEventDate.toISOString().slice(0, 10)}
            onChange={(e) => setNewEventDate(new Date(e.target.value))}
          />
        </label>
        <button onClick={handleAddEvent}>Add</button>
        <button onClick={() => setIsModalOpen(false)}>Cancel</button>
      </Modal>

      <Modal
        isOpen={isMapEventModalOpen}
        onRequestClose={() => setIsMapEventModalOpen(false)}
        contentLabel="Add Map Event"
        className="event-modal"
      >
        <h2>Add Map Event</h2>
        <label>
          Event Name:
          <input
            type="text"
            value={newMapEventName}
            onChange={(e) => setNewMapEventName(e.target.value)}
          />
        </label>
        <label>
          Event Address:
          <input
            type="text"
            value={newMapEventAddress}
            onChange={(e) => setNewMapEventAddress(e.target.value)}
          />
        </label>
        <label>
          Event Date:
          <input
            type="date"
            value={newMapEventDate.toISOString().slice(0, 10)}
            onChange={(e) => setNewMapEventDate(new Date(e.target.value))}
          />
        </label>
        <label>
          Event Duration (hours):
          <input
            type="number"
            value={newMapEventDuration}
            onChange={(e) => setNewMapEventDuration(parseInt(e.target.value))}
          />
        </label>
        <label>
          Max Participants:
          <input
            type="number"
            value={newMapEventMaxParticipants}
            onChange={(e) => setNewMapEventMaxParticipants(parseInt(e.target.value))}
          />
        </label>
        <label>
          Event Type:
          <input
            type="text"
            value={newMapEventType}
            onChange={(e) => setNewMapEventType(e.target.value)}
          />
        </label>
        <label>
          Event ID:
          <input
            type="number"
            value={newMapEventId}
            onChange={(e) => setNewMapEventId(parseInt(e.target.value))}
          />
        </label>
        <label>
          Secondary ID:
          <input
            type="number"
            value={newMapEventSecondaryId}
            onChange={(e) => setNewMapEventSecondaryId(parseInt(e.target.value))}
          />
        </label>
        <button onClick={handleAddMapEvent}>Add</button>
        <button onClick={() => setIsMapEventModalOpen(false)}>Cancel</button>
      </Modal>

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
  );
};

export default Event;
