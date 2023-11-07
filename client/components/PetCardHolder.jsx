import React, { useEffect } from 'react';
import PetCard from './PetCard.jsx';
import { useEffect, useState } from 'react';
//import axios from 'axios';

function PetCardHolder({ petData, setPetData }) { 

  const [pets, setPets] = useState([]);

  const handleUpdate = (updatedPet) => {
    setPets((prevPets) => {
      return prevPets.map((pet) => 
      pet._id === updatedPet._id ? updatedPet : pet
      );
    });
  };

  useEffect(() => {
    fetch('http://localhost:3000/pets')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error: Could not delete pet');
        }
        return response.json();
      })
      .then(() => {
        setPetData((prevData) => prevData.filter((pet) => pet._id !== _id)); 
      })
      .catch((error) => {
        console.error('There was a problem with the delete operation:', error);
      });
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/pets');
        if (!response.ok) {
          throw new Error('Error: Could not fetch pets');
        }
        const data = await response.json();
        setPetData(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchData();
  }, [setPetData]);

  return (
    <div className="petCardContainer">
      {petData.map((pet) => (
        <PetCard
          key={pet._id}
          _id={pet._id}
          name={pet.name}
          age={pet.age}
          description={pet.description}
          url={pet.url}
          onUpdate={handleUpdate}
        />
      ))}
    </div>
  );
}

export default PetCardHolder;
