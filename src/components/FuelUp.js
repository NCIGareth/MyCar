import React, { useState } from "react";
import { auth, firestore } from "./firebaseConfig";
import Navbar from "./Navbar";
import CarDropdown from "./CarDropdown";
import '../styles/FuelUp.scss';

function AddFuel() {
  const [litres, setLitres] = useState("");
  const [cost, setCost] = useState("1.60");
  const [selectedCarId, setSelectedCarId] = useState("");
  const [kilometersDriven, setKilometersDriven] = useState("");
  const [fuelEconomy, setFuelEconomy] = useState("");

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
      fuelRef.add({
        litres,
        cost,
        carId: selectedCarId,
        fuelEconomy,
        kilometersDriven,
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
      <label>
          Select a car:
          <CarDropdown
            userId={auth.currentUser.uid}
            setSelectedCarId={setSelectedCarId}
          />
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
          Fuel Economy:
          <input type="text" value={fuelEconomy} readOnly />
        </label>
       
      </form>
    </div>
  );
}

export default AddFuel;
