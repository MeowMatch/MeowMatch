import React from "react";
import PetCard from "./PetCard.jsx";
import { useEffect, useState } from "react";

function PetCardHolder() {
  const [petData, setPetData] = useState([]);

  useEffect(() => {
    // Fetch data from the server
    fetch("http://localhost:3000/") // Replace this with your server URL
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error: Could not fetch pets");
        }
        return response.json();
      })
      .then((data) => {
        setPetData(data); // Set fetched data in state
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  return (
    <div className="card-container">
      {petData.map((pet) => (
        <div key={pet._id} className="card">
          <div className="photo-container">
            <img src={pet.photoUrl} alt={pet.name} />
          </div>
          <div className="description-container">
            <h3>{pet.name}</h3>
            <p>{pet.description}</p>
          </div>
        </div>
      ))}
    </div>
  );

  //   return (
  //     <div className="petCardHolder">
  //       {/* elements go here */}
  //       <PetCard />
  //       <PetCard />
  //       <PetCard />
  //       <PetCard />
  //       <PetCard />
  //       <PetCard />
  //       <PetCard />
  //       <PetCard />
  //       <PetCard />
  //       <PetCard />
  //       <PetCard />
  //       <PetCard />
  //     </div>
  //   );
}

export default PetCardHolder;
