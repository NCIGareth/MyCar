import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { auth, firestore } from "./firebaseConfig";
import "../styles/Dashboard.scss";
import CarDropdown from "./CarDropdown";

function Dashboard() {
  const [services, setServices] = useState([]);
  const [fuel, setFuel] = useState([]);
  const [car, setCar] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState("");

  useEffect(() => {
    const unsubscribeService = firestore
      .collection("service")
      .where("carId", "==", selectedCarId)
      .onSnapshot((snapshot) => {
        const servicesData = [];
        snapshot.forEach((doc) =>
          servicesData.push({ ...doc.data(), id: doc.id })
        );
        setServices(servicesData);
      });

    const unsubscribeFuel = firestore
      .collection("fuel")
      .where("carId", "==", selectedCarId)
      .onSnapshot((snapshot) => {
        const fuelData = [];
        snapshot.forEach((doc) => fuelData.push({ ...doc.data(), id: doc.id }));
        setFuel(fuelData);
      });

    const unsubscribeCar = firestore
      .collection("cars")
      .where("user", "==", auth.currentUser.uid) // Filter cars by user ID
      .onSnapshot((snapshot) => {
        const carData = [];
        snapshot.forEach((doc) => carData.push({ ...doc.data(), id: doc.id }));
        setCar(carData);
      });

    return () => {
      unsubscribeService();
      unsubscribeFuel();
      unsubscribeCar();
    };
  }, [selectedCarId]);

  return (
    <div>
      <Navbar />
      <h1>Dashboard</h1>
      <CarDropdown userId={auth.currentUser.uid} setSelectedCarId={setSelectedCarId} />
      <h2>Services</h2>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.description}</td>
              <td>{service.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Fuel</h2>
      <table>
        <thead>
          <tr>
            <th>Cost</th>
            <th>Liters</th>
            <th>Kilometer's Driven</th>
            <th>Fuel Economy L/100KM</th>

          </tr>
        </thead>
        <tbody>
          {fuel.map((fuel) => (
            <tr key={fuel.id}>
              <td>{fuel.cost}</td>
              <td>{fuel.litres}</td>
              <td>{fuel.kilometersDriven}</td>
              <td>{fuel.fuelEconomy}</td>

            </tr>
          ))}
        </tbody>
      </table>

      <h2>Car</h2>
      <table>
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {car.map((car) => (
            <tr key={car.id}>
              <td>{car.make}</td>
              <td>{car.model}</td>
              <td>{car.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    
    </div>

    

    
  );
}

export default Dashboard;
