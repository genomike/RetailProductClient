import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AlmacenList from './components/AlmacenList';
import AlmacenForm from './components/AlmacenForm';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<AlmacenList />} />
          <Route path="/almacen-list" element={<AlmacenList />} />
          <Route path="/almacen-form" element={<AlmacenForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
