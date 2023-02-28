import React, { useState } from "react";
import { firestore } from "./firebaseConfig";
import Navbar from "./Navbar";
import '../styles/FuelUp.scss';



function AddFuel() {
  const [litres, setLitres] = useState("");
  const [cost, setCost] = useState("");

  const carRef = firestore.collection('fuel')

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      carRef.add({
        litres,
        cost,
      });
      setLitres("");
      setCost("");

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
       
        <button type="submit">Add FuelUp</button>
      </form>
    </div>

  );
}

export default AddFuel;
