// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import CoachesList from './coaches-list';
//import CustomerDetails from './customer-details';
import CustomersList from './customer-list';
import Clothes from './Clothes';
import AstroTest from './astro-test';
import Tips from './Tips';
import Events from './Events';
import * as api from'./api/Api';
import { useState } from 'react';
import CustomersDetails from './customer-details';

const App: React.FC = () => {
  const [connected, setConnected] = useState<boolean | undefined>(undefined);
  //api.fetchAllRoutesWithoutImages();
  // api.fetchAllRoutesOnlyImages();

  api.checkConnexionEmployee()
  .then((answer) => {
    setConnected(answer);
  });

  return (
    <Router>
      <Routes>
        <Route path="/" element={connected ? <Dashboard /> : <Login />} />
        <Route path="/dashboard" element={connected ? <Dashboard /> : <Login />} />
        <Route path="/login" element={connected ? <Dashboard/> : <Login />} />
        <Route path="/coaches" element={connected ? <CoachesList /> : <Login />} />
        <Route path="/customers" element={connected ? <CustomersList /> : <Login />} />
        <Route path="/clothes" element={connected ? <Clothes /> : <Login />} />
        <Route path="/compatibility" element={connected ? <AstroTest /> : <Login />} />
        <Route path="/tips" element={connected ? <Tips /> : <Login />} />
        <Route path="/events" element={connected ? <Events /> : <Login />} />
        <Route path="/customer-details/:id" element={connected ? <CustomersDetails /> : <Login />} />
        {/* <Route path="/customer-details" element={connected ? <CustomersDetails /> : <Login />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
