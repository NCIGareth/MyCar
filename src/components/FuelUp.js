import React, { useState } from "react";
import { firestore } from "./firebaseConfig";
import Navbar from "./Navbar";
import CarDropdown from "./CarDropdown";
import '../styles/FuelUp.scss';



function AddFuel() {
  const [litres, setLitres] = useState("");
  const [cost, setCost] = useState("");
  const [selectedCarId, setSelectedCarId] = useState("");

  const fuelRef = firestore.collection('fuel')

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      fuelRef.add({
        litres,
        cost,
        carId: selectedCarId, // include selected car id in the service document

      });
      setLitres("");
      setCost("");
      setSelectedCarId(""); // reset selected car id to an empty string


    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };



  return (
    <div className="AddFuel-Container">
      <Navbar />

      <form onSubmit={handleSubmit}>
        <label>
          Litres:
          <input
            type="text"
            value={litres}
            onChange={(e) => setLitres(e.target.value)} />
        </label>
        <br />
        <label>
          Cost:
          <input
            type="text"
            value={cost}
            onChange={(e) => setCost(e.target.value)} />
        </label>
        <label>
          Select a car:
          <CarDropdown setSelectedCarId={setSelectedCarId} />
        </label>
       
        <button type="submit">Add FuelUp</button>
      </form>
    </div>

  );
}

export default AddFuel;
