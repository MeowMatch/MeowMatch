import React, { useState } from 'react';

interface PetCardProps {
  name: string;
  age: number;
  description: string;
  url: string;
  onDelete: (id: string) => void;
  id: string;
  setPetData: React.Dispatch<React.SetStateAction<any[]>> 
}

const PetCard: React.FC<PetCardProps> = ({ name, age, description, url, onDelete, id, setPetData }) => {
  const [newName, setNewName] = useState<string>('');
  const [newAge, setNewAge] = useState<number>(0);
  const [newDescription, setNewDescription] = useState<string>('');
  const [newUrl, setNewUrl] = useState<string>('');
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

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
      setNewAge(0);
      setNewDescription('');
      setNewUrl('');
    } catch (error) {
      console.error('Error updating pet:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setNewName('');
    setNewAge(0);
    setNewDescription('');
    setNewUrl('');
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
              type="number"
              placeholder="Age"
              value={newAge}
              onChange={(e) => setNewAge(Number(e.target.value))}
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
        <>
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleCancelEdit}>Cancel</button>
        </>
      ) : (
        <>
          <button onClick={() => setIsEditMode(true)}>Edit</button>
          <button className="deleteButton" onClick={handleDelete}>
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default PetCard;
