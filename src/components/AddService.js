import React, { useState } from "react";
import { auth, firestore } from "./firebaseConfig";
import Navbar from "./Navbar";
import CarDropdown from "./CarDropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../styles/AddService.scss';



function AddService() {
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [selectedCarId, setSelectedCarId] = useState("");
  const [startDate, setStartDate] = useState(new Date());



  const serviceRef = firestore.collection('service')

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      serviceRef.add({
        description,
        cost,
        carId: selectedCarId,
        startDate, // include selected car id in the service document
      });
      setDescription("");
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
        <label>Date:
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </label>
        <br />
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
        <br />
        
        <label>
          Select a car:
          <CarDropdown
            userId={auth.currentUser.uid}
            setSelectedCarId={setSelectedCarId}
          />
        </label>

        <button type="submit">Add Service</button>
      </form>
    </div>

  );
}

export default AddService;
