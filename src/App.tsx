// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import CoachesList from './coaches-list';
import CustomerDetails from './customer-details';
import Clothes from './Clothes';
import AstroTest from './astro-test';
import * as api from'./api/Api';
import { useState } from 'react';

const App: React.FC = () => {
  const [connected, setConnected] = useState<boolean | undefined>(undefined);
  api.checkConnexionEmployee()
  .then((answer) => {
    setConnected(answer);
  });
  // api.fetchDistantClothes();
  // api.fetchDistantCustomers();
  return (
    <Router>
      <Routes>
        <Route path="/" element={connected ? <Dashboard /> : <Login />} />
        <Route path="/dashboard" element={connected ? <Dashboard /> : <Login />} />
        <Route path="/login" element={connected ? <Dashboard/> : <Login />} />
        <Route path="/coaches" element={connected ? <CoachesList /> : <Login />} />
        <Route path="/customers" element={connected ? <CustomerDetails /> : <Login />} />
        <Route path="/clothes" element={connected ? <Clothes /> : <Login />} />
        <Route path="/compatibility" element={connected ? <AstroTest /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
