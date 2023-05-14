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
      <h1>Add your Service</h1>
        <p>View all Services and Track Spending on your Dashboard.</p>
        <p></p>
        {errorMessage && (
        <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
      )}

      {successMessage && (
        <p style={{ color: "green", fontWeight: "bold" }}>{successMessage}</p>
      )}
        <label> Select a Date
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat='dd/MM/yyyy'
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
          {errors.description && <p style={{ color: "red", fontWeight: "bold" }}>{errors.description}</p>}
        </label>
        <br />
        <label>
          Cost:
          <input
            type="text"
            value={cost}
            onChange={(e) => setCost(e.target.value)} />
          {errors.cost && <p style={{ color: "red", fontWeight: "bold" }}>{errors.cost}</p>}
        </label>
        <br />
        <label>
          Select a Car:
          {auth.currentUser && (
            <CarDropdown
              userId={auth.currentUser.uid}
              setSelectedCarId={setSelectedCarId}
            />
          )}
          {errors.selectedCarId && <p style={{ color: "red", fontWeight: "bold" }}>{errors.selectedCarId}</p>}
        </label>
        <button type="submit">Add Service</button>
      </form>
    </div>

  );
}


export default AddService;
