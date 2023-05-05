import React, { useState } from "react";
import { auth, firestore } from "./firebaseConfig";
import Navbar from "./Navbar";
import CarDropdown from "./CarDropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../styles/AddService.scss';

function AddService({ cars }) {
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");
  const [selectedCarId, setSelectedCarId] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const serviceRef = firestore.collection('service')

  // Validations
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

  const handleSubmit = async (event) => { // When submit button is clicked
    event.preventDefault();

    const errors = validateFields();

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {

      if (selectedCarId.length === 0) { // If there is only one car pick that one
        selectedCarId(cars[0].id);

      }
      // Add new service document to Firestore
      const docRef = await serviceRef.add({ // Adding Service Record to Firebase
        description,
        cost,
        carId: selectedCarId,
        startDate,
      });
      console.log("Service Added ID: ", docRef.id);
      setErrorMessage("");


      // Reset form fields and clear errors
      setDescription("");
      setCost("");
      setSelectedCarId("");
      setSuccessMessage("Service added successfully!");
      setErrors({});

      // Display success message
      alert("Service added successfully!");
      setErrorMessage("");

    } catch (error) {
      console.error("Error adding Service: ", error);
      alert(error.message);
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="AddService-Container">
      <Navbar />

      <form onSubmit={handleSubmit}>
        {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <label> Select a Date
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat='dd/MM/yyyy'
            filterDate={date => date.getDay() !== 6 && date.getDay() !== 0}
            isClearable
            showYearDropdown
            scrollableMonthYearDropdown
          />
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
