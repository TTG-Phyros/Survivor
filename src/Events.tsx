import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Calendar from 'react-calendar';
import Modal from 'react-modal';
import './Events.css';
import { LatLngExpression } from 'leaflet';
import L from 'leaflet';
import Navbar from './Navbar';
import { addEvent, getEvents } from './api/Api';

const position: LatLngExpression = [48.862463, 2.304890];

const Event: React.FC = () => {

  const [mapEvents, setMapEvents] = useState<{ position: LatLngExpression; name: string; date: Date; duration: number; maxParticipants: number; type: string; }[]>([]);
  const [modalState, setModalState] = useState({
    isOpen: false,
    address: '',
    name: '',
    date: new Date(),
    duration: 0,
    maxParticipants: 0,
    type: ''
  });

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await getEvents();
        const formattedEvents = events.map((event: any) => ({
          position: [event.location_x, event.location_y] as LatLngExpression,
          name: event.name,
          date: new Date(event.date),
          duration: event.duration,
          maxParticipants: event.max_participants,
          type: event.type
        }));
        setMapEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleAddMapEvent = async () => {
    const { address, name, date, duration, maxParticipants, type } = modalState;
    if (address && name) {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`);
        const results = await response.json();

        if (results && results.length > 0) {
          const lat = parseFloat(results[0].lat);
          const lon = parseFloat(results[0].lon);

          const eventData = {
            name,
            date: date.toISOString(),
            duration,
            max_participants: maxParticipants,
            location_x: lat,
            location_y: lon,
            type,
            employee_id: 42,
            location_name: address
          };
          const addedEvent = await addEvent(eventData);

          if (addedEvent) {
            const newEvent = {
              position: [lat, lon] as LatLngExpression,
              name,
              date,
              duration,
              maxParticipants,
              type
            };
            setMapEvents(prevEvents => [...prevEvents, newEvent]);
            closeModal();
          } else {
            alert('Failed to add the event to the backend.');
          }
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
      <Navbar />

      <div className="event-section" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
        <h1>Events</h1>
        <div className="button-container">
          <button className="add-event-button" onClick={openModal}>Add Event</button>
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
          Type: 'type'
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
