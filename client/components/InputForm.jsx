import React from 'react';

function InputForm() {
  return (
    <div className="input-form" enctype="multipart/form-data">
      {/* Form elements go here */}
      <label className='label age'>Enter your pet's name:
        <input type="text" placeholder='Name'/>
      </label>
      <label className='label name'>Enter your pet's age:
        <input type="text" placeholder='Age'/>
      </label>
      <label className='label desc'>Briefly describe your pet:
        <textarea type="text" placeholder='Description' rows={5}/>
      </label>
      <button className='submitBtn'>Submit Pet</button>
    </div>
  );
}

export default InputForm;