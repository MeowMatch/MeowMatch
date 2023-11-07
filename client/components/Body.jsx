import React, { useEffect, useState } from 'react';
import InputForm from './InputForm.jsx';
import PetCardHolder from './PetCardHolder.jsx';

function Body() {
  const [petData, setPetData] = useState([]);

  useEffect(() => {
    fetchPetData();
  }, []);

  const fetchPetData = () => {
    fetch('http://localhost:3000/pets')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error: Could not fetch pets');
        }
        return response.json();
      })
      .then((data) => {
        setPetData(data);
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
      });
  };

  return (
    <div className="bodyComponent">
      <div className="input-container">
        <InputForm refreshPetData={fetchPetData} />
      </div>
      <div className="pet-card-holder-container">
        <PetCardHolder petData={petData} setPetData={setPetData} />
      </div>
    </div>
  );
}

export default Body;
