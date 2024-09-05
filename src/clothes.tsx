import React, { useState } from 'react';
import './clothes.css';
import { useNavigate } from 'react-router-dom';

const Clothes: React.FC = () => {
  const navigate = useNavigate();

  
  const [hatCount, setHatCount] = useState(0);
  const [clientCount, setClientCount] = useState(0);
  const [topCount, setTopCount] = useState(0);
  const [bottomCount, setBottomCount] = useState(0);
  const [shoesCount, setShoesCount] = useState(0);
  const [selectedClient, setSelectedClient] = useState(''); 

  
  const hatImageUrl = 'url_de_votre_image_chapeau.jpg';
  const clientImageUrl = 'url_de_votre_image_client.jpg';
  const topImageUrl = 'url_de_votre_image_haut.jpg';
  const bottomImageUrl = 'url_de_votre_image_bas.jpg';
  const shoesImageUrl = 'url_de_votre_image_chaussures.jpg';

  
  const clients = ['Client 1', 'Client 2', 'Client 3', 'Client 4'];

  const handleClientChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClient(event.target.value);
  };

  return (
    <div className="clothes">
      
      <header className="navbar">
        <div className="navbar-logo">Soul Connection</div>
        <nav className="navbar-links">
          <button className="navbar-link" onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button className="navbar-link active" onClick={() => navigate("/coaches")}>Coaches</button>
          <button className="navbar-link" onClick={() => navigate("/customers")}>Customers</button>
          <button className="navbar-link" onClick={() => navigate("/tips")}>Tips</button>
          <button className="navbar-link" onClick={() => navigate("/events")}>Events</button>
          <button className="navbar-link" onClick={() => navigate("/clothes")}>Clothes</button>
          <button className="navbar-link" onClick={() => navigate("/compatibility")}>Compatibility</button>
        </nav>
        <div className="navbar-actions">
          <button className="navbar-icon">🔔</button>
          <button className="navbar-icon">🇺🇸</button>
          <button className="navbar-icon" onClick={() => navigate("/login")}>👤</button>
        </div>
      </header>

      <h1>Clothes Page</h1>
      <p>Welcome to the clothes section! Here you can find various clothing items.</p>

      
      <div className="dropdown-container">
        <label htmlFor="client-select">Sélectionnez le premier client</label>
        <select id="client-select" value={selectedClient} onChange={handleClientChange}>
          <option value="">Sélectionnez le premier client</option>
          {clients.map((client, index) => (
            <option key={index} value={client}>
              {client}
            </option>
          ))}
        </select>
      </div>

      
      <div className="navigation-container">
        <button className="arrow-button" onClick={() => setHatCount(hatCount - 1)}>
          ←
        </button>
        <div className="clothing-item-container">
          <img src={hatImageUrl} alt="Chapeau" className="clothing-image" />
          <p>{hatCount}</p>
        </div>
        <button className="arrow-button" onClick={() => setHatCount(hatCount + 1)}>
          →
        </button>
      </div>

      
      <div className="navigation-container">
        <button className="arrow-button" onClick={() => setClientCount(clientCount - 1)}>
          ←
        </button>
        <div className="clothing-item-container">
          <img src={clientImageUrl} alt="Image de profil du client" className="clothing-image" />
          <p>{clientCount}</p>
        </div>
        <button className="arrow-button" onClick={() => setClientCount(clientCount + 1)}>
          →
        </button>
      </div>

      
      <div className="navigation-container">
        <button className="arrow-button" onClick={() => setTopCount(topCount - 1)}>
          ←
        </button>
        <div className="clothing-item-container">
          <img src={topImageUrl} alt="Haut" className="clothing-image" />
          <p>{topCount}</p>
        </div>
        <button className="arrow-button" onClick={() => setTopCount(topCount + 1)}>
          →
        </button>
      </div>

      
      <div className="navigation-container">
        <button className="arrow-button" onClick={() => setBottomCount(bottomCount - 1)}>
          ←
        </button>
        <div className="clothing-item-container">
          <img src={bottomImageUrl} alt="Bas" className="clothing-image" />
          <p>{bottomCount}</p>
        </div>
        <button className="arrow-button" onClick={() => setBottomCount(bottomCount + 1)}>
          →
        </button>
      </div>

      
      <div className="navigation-container">
        <button className="arrow-button" onClick={() => setShoesCount(shoesCount - 1)}>
          ←
        </button>
        <div className="clothing-item-container">
          <img src={shoesImageUrl} alt="Chaussures" className="clothing-image" />
          <p>{shoesCount}</p>
        </div>
        <button className="arrow-button" onClick={() => setShoesCount(shoesCount + 1)}>
          →
        </button>
      </div>
    </div>
  );
};

export default Clothes;
