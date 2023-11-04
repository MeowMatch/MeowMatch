import React from "react";
import InputForm from "./InputForm";
import PetCardHolder from "./PetCardHolder";

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
