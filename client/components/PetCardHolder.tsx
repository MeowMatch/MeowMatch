import React, { useEffect } from 'react';
import PetCard from './PetCard';
import { Pet } from '../types/pet.types'

interface PetCardHolderProps {
  petData: Pet[];
  setPetData: React.Dispatch<React.SetStateAction<Pet[]>>;
}

const PetCardHolder: React.FC<PetCardHolderProps> = ({
  petData,
  setPetData,
}) => {
  const deletePet = (_id: string) => {
    fetch(`http://localhost:3000/pets/${_id}`, {
      method: 'DELETE',
    })
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
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/pets');
        if (!response.ok) {
          throw new Error('Error: Could not fetch pets');
        }
        const data: Pet[] = await response.json();
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
          name={pet.name}
          age={pet.age}
          description={pet.description}
          url={pet.url}
          id={pet._id}
          setPetData={setPetData}
          onDelete={deletePet}
        />
      ))}
    </div>
  );
};

export default PetCardHolder;
