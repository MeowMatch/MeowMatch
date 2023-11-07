import React from 'react';
import axios from 'axios';
import { useState } from 'react';

function PetCard({ name, age, description, url, _id }) {
  const handleDeletePet = async () => {
    try {
    const response = await axios.delete(`http://localhost:3000/pets/${_id}`);
    console.log('Pet deleted successfully');
  } catch (error) {
    console.error('Error deleting pet: ', error);
  }
  }

  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  const handleUpdate = async () => {
    try {
      const response = await axios.patch(`http://localhost:3000/pets/${_id}`, {
        newName,
        newAge,
        newDescription,
        newUrl,
      });
      console.log('Pet updated successfully');
      setNewName(''); // Clear the input fields
      setNewAge('');
      setNewDescription('');
      setNewUrl('');
      //handleUpdate(response.data);
    } catch (error) {
      console.error('Error updating pet: ', error);
    }
  }

  return (
    <div className="petCard">
      <img src={url} alt={name} className="petImage" />
      <div className="petDetails">
        <strong>{name}</strong>
        <p>Age: {age}</p>
        <p>{description}</p>
      </div>
      {isEditMode ? (
      <div className="updatePetForm">
        <input
          type="text"
          placeholder="New Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="number"
          placeholder="New Age"
          value={newAge}
          onChange={(e) => setNewAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="New Description"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <input
          type="url"
          placeholder="New URL"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
      </div>
      ) : null}
      <button onClick={() => setIsEditMode(!isEditMode)}>
        {isEditMode ? "Cancel" : "Edit Pet"}
      </button>
      <button className="deleteBtn" onClick={handleDeletePet}>
          Delete Pet
        </button>
        <button className="updateBtn" onClick={handleUpdate}>
          Update Pet
        </button>
    </div>
  );
}

export default PetCard;
