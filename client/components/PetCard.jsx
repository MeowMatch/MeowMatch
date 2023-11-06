import React from 'react';

function PetCard({ name, age, description, url }) {
  return (
    <div className="petCard">
      {/* <img src={url} alt={`${name}`} className="petImage" />
      <div className="petDetails">
        <strong>{name}</strong>
        <p>Age: {age}</p>
        <p>{description}</p>
      </div> */}

      <img
        src="https://i.pinimg.com/originals/81/6d/a5/816da533638aee63cfbd315ea24cccbd.jpg"
        alt={`${name}`}
        className="petImage"
      />
      <div className="petDetails">
        <strong>{name}</strong>
        <p>Age: {age}</p>
        <p>{description}</p>
      </div> 
    </div>
  );
}

export default PetCard;