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
  const [errors, setErrors] = useState({});

  const serviceRef = firestore.collection('service')

  const validateFields = () => {
    let errors = {};

    if (!description) {
      errors.description = "Please enter a description.";
    }

    if (!cost) {
      errors.cost = "Please enter a cost.";
    } else if (!/^\d+(\.\d{1,2})?$/.test(cost)) {
      errors.cost = "Please enter a valid cost.";
    }

    if (!selectedCarId) {
      errors.selectedCarId = "Please select a car.";
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateFields();

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      // Add new service document to Firestore
      const docRef = await serviceRef.add({
        description,
        cost,
        carId: selectedCarId,
        startDate,
      });
      console.log("Document written with ID: ", docRef.id);

      // Reset form fields and clear errors
      setDescription("");
      setCost("");
      setSelectedCarId("");
      setErrors({});

      // Display success message
      alert("Service added successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert(error.message);
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
          {errors.description && <div className="error">{errors.description}</div>}
        </label>
        <br />
        <label>
          Cost:
          <input
            type="text"
            value={cost}
            onChange={(e) => setCost(e.target.value)} />
          {errors.cost && <div className="error">{errors.cost}</div>}
        </label>
        <br />
        <label>
          Select a car:
          {auth.currentUser && (
  <CarDropdown
    userId={auth.currentUser.uid}
    setSelectedCarId={setSelectedCarId}
  />
)}

          {errors.selectedCarId && <div className="error">{errors.selectedCarId}</div>}
        </label>

        <button type="submit">Add Service</button>
      </form>
    </div>

  );
}


export default AddService;
