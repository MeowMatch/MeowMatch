import React from 'react';
import NavBar from './components/NavBar.jsx';
import Body from './components/Body.jsx';
import './public/style.css';

function Pets() {
  return (
    <div className="App">
      <NavBar />
      <Body />
    </div>
  );
}

export default Pets;
