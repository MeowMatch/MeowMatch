import React, { useState } from 'react';
// import meow from '../public/soundfx/meow.mp3'

interface InputFormProps {
  refreshPetData: () => void;
}

const InputForm: React.FC<InputFormProps> = ({ refreshPetData }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');

  // function submitSound(){
  //   new Audio(meow).play();
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // submitSound();

    try {
      await fetch('http://localhost:3000/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age, description, url }),
      });
      refreshPetData();
      setName('');
      setAge(0);
      setDescription('');
      setUrl('');
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div className="input-form">
      <form onSubmit={handleSubmit}>
        <label className="label name">
          Enter your pet's name:
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="label age">
          Enter your pet's age:
          <input
            type="text"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
          />
        </label>
        <label className="label desc">
          Briefly describe your pet:
          <textarea
            placeholder="Description"
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className="label url">
          Upload a photo of your pet (URL):
          <input
            type="text"
            placeholder="Photo URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <button className="submitBtn" type="submit">
          Submit Pet
        </button>
      </form>
    </div>
  );
}

export default InputForm;
