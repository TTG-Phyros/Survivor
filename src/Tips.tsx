import React from 'react';
import './Tips.css';
import * as api from './api/Api.js'
import Navbar from './Navbar';

const Tips: React.FC = () => {
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
      <Navbar />
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
