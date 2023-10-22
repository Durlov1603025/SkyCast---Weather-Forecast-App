// src/App.js

import React from 'react';
import Weather from './Weather';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="text-4xl font-extrabold mb-4">Weather App</h1>
        <Weather />
      </header>
    </div>
  );
}

export default App;
