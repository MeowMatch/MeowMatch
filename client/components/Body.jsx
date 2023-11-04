import React from "react";
import InputForm from "/Users/jakejohnson/Desktop/Codesmith/MeowMatch/client/components/InputForm.jsx";
import PetCardHolder from "/Users/jakejohnson/Desktop/Codesmith/MeowMatch/client/components/PetCardHolder.jsx";

function Body() {
  return (
    <div className="bodyComponent">
      <div className="input-container">
        <InputForm />
      </div>
      <div className="pet-card-holder-container">
        <PetCardHolder />
      </div>
    </div>
  );
}

export default Body;
