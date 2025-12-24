import React from 'react';
import Navbar from './components/Navbar';
import Products from './components/Products';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Products />
      </main>
    </div>
  );
}

export default App;
