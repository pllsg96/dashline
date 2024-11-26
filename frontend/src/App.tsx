import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TripRequestForm from './components/TripRequestForm';
import TripOptions from './components/TripOptions';
import TripHistory from './components/TripHistory';
import { TripProvider } from './context/TripContext';

const App: React.FC = () => {
  return (
    <TripProvider>
      <Router>
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<TripRequestForm />} />
            <Route path="/options" element={<TripOptions />} />
            <Route path="/history" element={<TripHistory />} />
          </Routes>
        </div>
      </Router>
    </TripProvider>
  );
};

export default App;
