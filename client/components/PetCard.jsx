// import React from 'react';

// function PetCard({ name, age, description, url, onDelete, id, setPetData }) {
//   const handleDelete = () => {
//     onDelete(id);
//   };

//   return (
//     <div className="petCard">
//       <img src={url} alt={name} className="petImage" />
//       <div className="petDetails">
//         <strong>{name}</strong>
//         <p>Age: {age}</p>
//         <p>{description}</p>
//       </div>
//       <button className="deleteButton" onClick={handleDelete}>
//         Delete
//       </button>
//     </div>
//   );
// }

// export default PetCard;

import React, { useState } from 'react';

function PetCard({ name, age, description, url, onDelete, id, setPetData }) {
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3000/pets/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newName || name,
          age: newAge || age,
          description: newDescription || description,
          url: newUrl || url,
        }),
      });

      if (!response.ok) {
        throw new Error('Error updating pet');
      }

      setIsEditMode(false);
      setPetData((prevData) => {
        return prevData.map((pet) =>
          pet._id === id
            ? {
                ...pet,
                name: newName,
                age: newAge,
                description: newDescription,
                url: newUrl,
              }
            : pet
        );
      });
      setNewName('');
      setNewAge('');
      setNewDescription('');
      setNewUrl('');
    } catch (error) {
      console.error('Error updating pet:', error);
    }
  };

  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="petCard">
      <img src={url} alt={name} className="petImage" />
      <div className="petDetails">
        {isEditMode ? (
          <>
            <input
              type="text"
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Age"
              value={newAge}
              onChange={(e) => setNewAge(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <input
              type="text"
              placeholder="URL"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
            />
          </>
        ) : (
          <>
            <strong>{name}</strong>
            <p>Age: {age}</p>
            <p>{description}</p>
          </>
        )}
      </div>
      {isEditMode ? (
        <button onClick={handleUpdate}>Update</button>
      ) : (
        <button onClick={() => setIsEditMode(true)}>Edit</button>
      )}
      <button className="deleteButton" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default PetCard;
