import React from 'react';
import './App.css';
import GraphComponent from './getAPIEndpoints.js';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import SignInObject from './signInObject';
import RegistrationForm from './RegistrationPageObject'

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/home" element={<GraphComponent />} />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
