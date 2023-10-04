import React from 'react';
import './App.css';
import GraphComponent from './getAPIEndpoints.js';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* Remove the existing content */}
        <GraphComponent/>
      </header>
    </div>
  );
}

export default App;
