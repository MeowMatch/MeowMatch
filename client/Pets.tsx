import React, { useEffect } from 'react';
import NavBar from './components/NavBar';
import Body from './components/Body';
import './public/style.css';

const Pets: React.FC = () => {
  return (
    <div className="App">
      <NavBar />
      <Body />
    </div>
  );
};

export default Pets;
