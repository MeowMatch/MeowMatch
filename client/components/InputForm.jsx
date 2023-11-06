// import React from 'react';

// function InputForm() {
//   return (
//     <div className="input-form" enctype="multipart/form-data">
//       {/* Form elements go here */}
//       <label className='label age'>Enter your pet's name:
//         <input type="text" placeholder='Name'/>
//       </label>
//       <label className='label name'>Enter your pet's age:
//         <input type="text" placeholder='Age'/>
//       </label>
//       <label className='label desc'>Briefly describe your pet:
//         <textarea type="text" placeholder='Description' rows={5}/>
//       </label>
//       <button className='submitBtn'>Submit Pet</button>
//     </div>
//   );
// }

// export default InputForm;

import React, { useState } from 'react';

function InputForm() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch('http://localhost:3000/pets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age, description, url }),
      });
      setName('');
      setAge('');
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
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <label className="label desc">
          Briefly describe your pet:
          <textarea
            type="text"
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