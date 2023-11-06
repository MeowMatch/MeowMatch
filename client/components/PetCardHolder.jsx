import React from 'react';
import PetCard from './PetCard.jsx';
import { useEffect, useState } from 'react';

function PetCardHolder() {
  const [petData, setPetData] = useState([]);

  useEffect(() => {
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
  }, []);

  return (
    <div className="petCard">
      {petData.map((pet) => (
        <PetCard
          key={pet._id}
          name={pet.name}
          age={pet.age}
          description={pet.description}
          url={pet.url}
        />
      ))}
    </div>
  );
}

export default PetCardHolder;