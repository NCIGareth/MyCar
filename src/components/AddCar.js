import React, { useState } from "react";
import { auth, firestore } from "./firebaseConfig";
import Navbar from "./Navbar";
import '../styles/AddCar.scss'



function AddCar() {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [engine, setEngine] = useState("");

  const carRef = firestore.collection('cars')

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      carRef.add({
        user: auth.currentUser.uid,
        make,
        model,
        year,
        fuelType,
        engine,
      });
      setMake("");
      setModel("");
      setYear("");
      setFuelType("");
      setEngine("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };



  return (
    <div className="AddCar-Container">
      <Navbar />

      <form onSubmit={handleSubmit}>
        <label>
          Make:
          <input
            type="text"
            value={make}
            onChange={(e) => setMake(e.target.value)} />
        </label>
        <br />
        <label>
          Model:
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)} />
        </label>
        <br />
        <label>
          Year:
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)} />
        </label>
        <br />
        <label>
          Fuel Type:
          <input
            type="text"
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)} />
        </label>
        <br />
        <label>
          Engine:
          <input
            type="text"
            value={engine}
            onChange={(e) => setEngine(e.target.value)} />
        </label>
        <br />
        <button type="submit">Add Car</button>
      </form>
    </div>

  );
}

export default AddCar;
