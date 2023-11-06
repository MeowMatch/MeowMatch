import React from 'react';

function PetCard({ name, age, description, url }) {
  return (
    <div className="petCard">
      <img src={url} alt={name} className="petImage" />
      <div className="petDetails">
        <strong>{name}</strong>
        <p>Age: {age}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default PetCard;
