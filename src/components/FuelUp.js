import React, { useState } from "react";
import { auth, firestore } from "./firebaseConfig";
import Navbar from "./Navbar";
import CarDropdown from "./CarDropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../styles/FuelUp.scss';

function AddFuel({ cars }) {
  const [litres, setLitres] = useState("");
  const [cost, setCost] = useState("");
  const [selectedCarId, setSelectedCarId] = useState("");
  const [kilometersDriven, setKilometersDriven] = useState("");
  const [fuelEconomy, setFuelEconomy] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [errors, setErrors] = useState({});
  const fuelRef = firestore.collection('fuel')

  // Calclate Fuel Economy L/100KM using Litres and Kilometers Driven
  const calculateFuelEconomy = () => {
    const litresNum = parseFloat(litres);
    const costNum = parseFloat(cost);
    const kilometersDrivenNum = parseFloat(kilometersDriven);

    if (litresNum && costNum && kilometersDrivenNum && litresNum > 0 && costNum > 0 && kilometersDrivenNum > 0) {
      const fuelEconomyNum = (kilometersDrivenNum / litresNum).toFixed(2); // for example, km/L
      setFuelEconomy((fuelEconomyNum)); // set as string
    } else {
      setFuelEconomy("");
    }
  };

  // Validations
  const validateFields = () => {
    let errors = {};

    if (!litres) {
      errors.litres = "Please enter litres.";
    } else if (!/^\d+(\.\d{1,2})?$/.test(litres)) {
      errors.litres = "Please enter a valid litres.";
    }

    if (!cost) {
      errors.cost = "Please enter a cost.";
    } else if (!/^\d+(\.\d{1,2})?$/.test(cost)) {
      errors.cost = "Please enter a valid cost.";
    }

    if (!kilometersDriven) {
      errors.kilometersDriven = "Please enter Kilometers Driven.";
    } else if (!/^\d+(\.\d{1,2})?$/.test(kilometersDriven)) {
      errors.kilometersDriven = "Please enter a valid kilometers Driven.";
    }

    return errors;

  }

  const handleSubmit = (event) => { // When submit button is clicked
    event.preventDefault();

    const errors = validateFields();


    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {

      if (selectedCarId.length === 0) { // if there is only one car pick that one
        selectedCarId(cars[0].id);

      }
      fuelRef.add({ // Adding fuel record to Firebase
        litres,
        cost,
        carId: selectedCarId,
        fuelEconomy,
        kilometersDriven,
        startDate,
      });
      console.log("Fuel Added ID: ", fuelRef.id);

      // Reset form fields and clear errors
      setLitres("");
      setCost("");
      setSelectedCarId("");
      setKilometersDriven("");
      setFuelEconomy("");
      setSuccessMessage("Fuel added successfully!");
      setErrors({});

      // Display Success Message
      alert("Fuel added successfully!");
      setErrorMessage("");

    } catch (error) {
      console.error("Error adding Fuel: ", error);
      alert(error.message);
      setErrorMessage(error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="AddFuel-Container">
      <Navbar />

      <form onSubmit={handleSubmit}>
      <h1>Add your Fuel Up</h1>
        <p>Fill up your Car, Reset you Trip/Odometer, Drive, Fill up, Record your Fill up here.</p>
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
          Select a Car:
          {auth.currentUser && (
            <CarDropdown
              userId={auth.currentUser.uid}
              setSelectedCarId={setSelectedCarId}
            />
          )}
        </label>
        <br />
        <label>
          Kilometers driven:
          <input
            type="text"
            value={kilometersDriven}
            onChange={(e) => {
              setKilometersDriven(e.target.value);
              calculateFuelEconomy();
            }}
          />
          {errors.kilometersDriven && <p style={{ color: "red", fontWeight: "bold" }}>{errors.kilometersDriven}</p>}

        </label>
        <br />
        <label>
          Litres:
          <input
            type="text"
            value={litres}
            onChange={(e) => {
              setLitres(e.target.value);
              calculateFuelEconomy();
            }}
          />
          {errors.litres && <p style={{ color: "red", fontWeight: "bold" }}>{errors.litres}</p>}
        </label>
        <br />
        <label>
          Cost:
          <input
            type="text"
            value={cost}
            onChange={(e) => {
              setCost(e.target.value);
              calculateFuelEconomy();
            }}
          />
          {errors.cost && <p style={{ color: "red", fontWeight: "bold" }}>{errors.cost}</p>}

        </label>
        <br />
        <button type="submit">Add Fuel Up</button>
        <br />
        <label>
          Fuel Economy (Liters per 100KM):
          <input type="text" value={fuelEconomy} readOnly />
        </label>

      </form>
    </div>
  );
}

export default AddFuel;
