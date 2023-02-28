import React, { useState } from "react";
import { firestore } from "./firebaseConfig";
import Navbar from "./Navbar";
import '../styles/AddService.scss';



function AddService() {
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");

  const carRef = firestore.collection('Service')

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      carRef.add({
        description,
        cost,
      });
      setDescription("");
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
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <label>
          Cost:
          <input
            type="text"
            value={cost}
            onChange={(e) => setCost(e.target.value)} />
        </label>
       
        <button type="submit">Add Service</button>
      </form>
    </div>

  );
}

export default AddService;
