import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TripRequestForm from './components/TripRequestForm';
import TripOptions from './components/TripOptions';
import TripHistory from './components/TripHistory';
import { TripProvider } from './context/TripContext';
import Random from './components/teste';

const App: React.FC = () => {
  return (
    <TripProvider>
      <Router>
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<TripRequestForm />} />
            <Route path="/options" element={<TripOptions />} />
            <Route path="/history" element={<TripHistory />} />
            <Route path="/random" element={<Random />} />
          </Routes>
        </div>
      </Router>
    </TripProvider>
  );
};

export default App;
