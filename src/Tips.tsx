import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Tips.css';
import * as api from './api/Api.js'

const Tips: React.FC = () => {
  const navigate = useNavigate();

  const [openTips, setOpenTips] = React.useState<number | null>(null);
  const [tipsData, setTipsData] = React.useState([{
    title: "",
    tip: ""
  }]);

  api.getTips().then(tips => {
    setTipsData(tips);
  })

  const handleToggle = (index: number) => {
    setOpenTips((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="container">
      <header className="navbar">
        <div className="navbar-logo">Soul Connection</div>
        <nav className="navbar-links">
          <button className="navbar-link" onClick={() => { navigate("/dashboard"); window.location.reload(); }}>Dashboard</button>
          <button className="navbar-link" onClick={() => { navigate("/coaches"); window.location.reload(); }}>Coaches</button>
          <button className="navbar-link" onClick={() => { navigate("/customers"); window.location.reload(); }}>Customers</button>
          <button className="navbar-link active" onClick={() => { navigate("/tips"); window.location.reload(); }}>Tips</button>
          <button className="navbar-link" onClick={() => { navigate("/events"); window.location.reload(); }}>Events</button>
          <button className="navbar-link" onClick={() => { navigate("/clothes"); window.location.reload(); }}>Clothes</button>
          <button className="navbar-link" onClick={() => { navigate("/compatibility"); window.location.reload(); }}>Compatibility</button>
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
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleToggle(index)}
                  >
                    {tip.title}
                    <span className={`arrow ${openTips === index ? 'up' : 'down'}`}>▼</span>
                  </td>
                </tr>
                {openTips === index && (
                  <tr className="tip-content-row">
                    <td className="tip-content">
                      <p>{tip.tip || "Content coming soon!"}</p>
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
