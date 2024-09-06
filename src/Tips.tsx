import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Tips.css';
import * as api from './api/Api.js'

const tipsData = [
  {
    title: 'Help to choose the right clothes',
    content:
      'It is important to choose the right clothes for the first date. The first impression is very important. The first thing that a person sees is the appearance. It is important to choose the right clothes for the first date. The first impression is very important. The first thing that a person sees is the appearance.',
  },
  { title: 'How to choose the right perfume?', content: '' },
  { title: 'Some dating app tips', content: '' },
  { title: 'How to choose a good place for a date?', content: '' },
  { title: 'How to choose photos for a dating profile?', content: '' },
];

const Tips: React.FC = () => {
  const navigate = useNavigate();

  const [openTips, setOpenTips] = React.useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenTips((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="app">
      {/* Barre de navigation */}
      <header className="navbar">
        <div className="navbar-logo">Soul Connection</div>
        <nav className="navbar-links">
          <button className="navbar-link" onClick={() => { navigate("/dashboard"); window.location.reload(); }}>Dashboard</button>
          <button className="navbar-link" onClick={() => { navigate("/coaches"); window.location.reload(); }}>Coaches</button>
          <button className="navbar-link" onClick={() => { navigate("/customers"); window.location.reload(); }}>Customers</button>
          <button className="navbar-link" onClick={() => { navigate("/tips"); window.location.reload(); }}>Tips</button>
          <button className="navbar-link" onClick={() => { navigate("/events"); window.location.reload(); }}>Events</button>
          <button className="navbar-link" onClick={() => { navigate("/clothes"); window.location.reload(); }}>Clothes</button>
          <button className="navbar-link active" onClick={() => { navigate("/compatibility"); window.location.reload(); }}>Compatibility</button>
        </nav>
        <div className="navbar-actions">
          <button className="navbar-icon">🔔</button>
          <button className="navbar-icon">🇺🇸</button>
          <button className="navbar-icon" onClick={() => {api.disconnectEmployee(); window.location.reload()}}>👤</button>
        </div>
      </header>

      {/* Contenu des conseils */}
      <div className="container">
        <header>
          <h1>Tips for Coaches</h1>
        </header>
        <table className="tips-table">
          <tbody>
            {tipsData.map((tip, index) => (
              <React.Fragment key={index}>
                <tr className="tip-row">
                  <td
                    className={`tip-title ${openTips === index ? 'active' : ''}`}
                    onClick={() => handleToggle(index)}
                    aria-expanded={openTips === index ? 'true' : 'false'}
                  >
                    {tip.title}
                  </td>
                </tr>
                {openTips === index && (
                  <tr className="tip-content-row">
                    <td className="tip-content">
                      <p>{tip.content || "Content coming soon!"}</p>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tips;
