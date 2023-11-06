import React from 'react';

function PetCard({ name, age, description, url, onDelete, id, setPetData }) {
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="petCard">
      <img src={url} alt={name} className="petImage" />
      <div className="petDetails">
        <strong>{name}</strong>
        <p>Age: {age}</p>
        <p>{description}</p>
      </div>
      <button className="deleteButton" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default PetCard;
