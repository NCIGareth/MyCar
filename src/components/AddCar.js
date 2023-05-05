import React, { useState } from "react";
import { auth, firestore } from "./firebaseConfig";
import Navbar from "./Navbar";
import "../styles/AddCar.scss";

function AddCar({ onCarAdded }) {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("<2003");
  const [fuelType, setFuelType] = useState("petrol");
  const [engine, setEngine] = useState("0.9-1.2");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [carId, setCarId] = useState("");


  const carRef = firestore.collection("cars");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!make || !model) {
        throw new Error("Make and model are required");
      }

      if (make.length > 50) {
        throw new Error("Make should be no more than 50 characters long");
      }

      if (model.length > 50) {
        throw new Error("Model should be no more than 50 characters long");
      }

      const response = await carRef.add({
        user: auth.currentUser.uid,
        make,
        model,
        year,
        fuelType,
        engine,
      });
      const carId = response.id;
      setCarId(carId);

      setMake("");
      setModel("");
      setYear("<2003");
      setFuelType("petrol");
      setEngine("0.9-1.2");
      setErrorMessage("");
      setSuccessMessage("Car added successfully!");
      console.log("Car added with ID: ", response.id);
    } catch (error) {
      console.error("Error adding document: ", error);
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="AddCar-Container">
      <Navbar />

      <form onSubmit={handleSubmit}>
        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <label>
          Make:
          <input
            type="text"
            value={make}
            onChange={(e) => setMake(e.target.value)}
            maxLength="50"
          />
        </label>
        <br />
        <label>
          Model:
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            maxLength="50"
          />
        </label>
        <br />

        <label>
          Year:
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="<2003">before 2003</option>
            <option value="2003-2008">2003-2008</option>
            <option value="2009-2014">2009-2014</option>
            <option value="2014-2019">2014-2019</option>
            <option value="2019>">after 2019</option>
          </select>
        </label>
        <br />

        <label>
          Fuel Type:
          <select
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
          >
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="hybrid">Hybrid
</option>
          </select>
        </label>

        <br />
        <label>
          Engine:
          <select value={engine} onChange={(e) => setEngine(e.target.value)}>
            <option value="0.9-1.2">0.9-1.2</option>
            <option value="1.3-1.6">1.3-1.6</option>
            <option value="1.7-1.9">1.7-1.9</option>
            <option value="1.8-2.1">1.8-2.1</option>
            <option value="2.2-2.5">2.5+</option>
          </select>
        </label>
        <br />
        <button type="submit">Add Car</button>
      </form>
    </div>

  );
}

export default AddCar;