import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'; // Importation des composants de React Router
import SoulConnection_Login from './Login'; // Importation de la page de connexion
import Dashboard from './Dashboard'; // Importation de la page de tableau de bord
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Définition de la route de la page de connexion */}
          <Route path="/" element={<SoulConnection_Login />} />
          {/* Définition de la route de la page du tableau de bord */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
