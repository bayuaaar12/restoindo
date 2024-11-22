import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarComponent from './components/NavbarComponent';
import RestaurantDetailPage from './components/RestaurantDetailPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<NavbarComponent />} />
          <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;