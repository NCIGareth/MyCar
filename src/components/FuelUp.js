import React, { useState } from "react";
import { auth, firestore } from "./firebaseConfig";
import Navbar from "./Navbar";
import CarDropdown from "./CarDropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import '../styles/FuelUp.scss';

function AddFuel({cars}) {
  const [litres, setLitres] = useState("");
  const [cost, setCost] = useState("1.60");
  const [selectedCarId, setSelectedCarId] = useState("");
  const [kilometersDriven, setKilometersDriven] = useState("");
  const [fuelEconomy, setFuelEconomy] = useState("");
  const [startDate, setStartDate] = useState(new Date());


  const fuelRef = firestore.collection('fuel')

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

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      if (selectedCarId.length ===0){
        selectedCarId(cars[0].id);
  
      }
      fuelRef.add({
        litres,
        cost,
        carId: selectedCarId,
        fuelEconomy,
        kilometersDriven,
        startDate,
      });
      setLitres("");
      setCost("");
      setSelectedCarId("");
      setKilometersDriven("");
      setFuelEconomy("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className="AddFuel-Container">
      <Navbar />

      <form onSubmit={handleSubmit}>
      <label> Select a date
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
          Select a car:
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
        </label>
        <br />
        <button type="submit">Add FuelUp</button>
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
