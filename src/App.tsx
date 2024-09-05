// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Login';
import CoachesList from './coaches-list';
import CustomerDetails from './customer-details';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/coaches" element={<CoachesList />} />
        <Route path="/customers" element={<CustomerDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
