import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { auth, firestore } from "./firebaseConfig";
import "../styles/Dashboard.scss";
import CarDropdown from "./CarDropdown";
//import FuelChart from "./FuelChart";

function Dashboard() {
  const [services, setServices] = useState([]);
  const [fuel, setFuel] = useState([]);
  const [car, setCar] = useState([]);
  const [selectedCarId, setSelectedCarId] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribeService = firestore
      .collection("service")
      .where("carId", "==", selectedCarId)
      .onSnapshot(
        (snapshot) => {
          const servicesData = [];
          snapshot.forEach((doc) =>
            servicesData.push({ ...doc.data(), id: doc.id })
          );
          setServices(servicesData);
        },
        (error) => {
          setError(error);
        }
      );

    const unsubscribeFuel = firestore
      .collection("fuel")
      .where("carId", "==", selectedCarId)
      .onSnapshot(
        (snapshot) => {
          const fuelData = [];
          snapshot.forEach((doc) => fuelData.push({ ...doc.data(), id: doc.id }));
          setFuel(fuelData);
        },
        (error) => {
          setError(error);
        }
      );

    const unsubscribeCar = firestore
      .collection("cars")
      .where("user", "==", auth.currentUser.uid) // Filter cars by user ID
      .onSnapshot(
        (snapshot) => {
          const carData = [];
          snapshot.forEach((doc) => carData.push({ ...doc.data(), id: doc.id }));
          setCar(carData);
        },
        (error) => {
          setError(error);
        }
      );

    return () => {
      unsubscribeService();
      unsubscribeFuel();
      unsubscribeCar();
    };
  }, [selectedCarId]);


  const handleDelete = (collectionName, documentId) => {
    firestore
      .collection(collectionName)
      .doc(documentId)
      .delete()
      .catch((error) => {
        setError(error);
      });
  };

  const handleDeleteService = (serviceId) => {
    handleDelete("service", serviceId);
  };
  const handleDeleteCar = (carId) => {
    handleDelete("cars", carId);
  };
  const handleDeleteFuel = (fuelId) => {
    handleDelete("fuel", fuelId);
  };


  const totalServiceCost = services.reduce(
    (acc, { cost }) => acc + Number(cost),
    0
  );

  const totalFuelCost = fuel.reduce(
    (acc, { cost }) => acc + Number(cost),
    0
  );
  const totalFuelEconomy = fuel.reduce(
    (acc, { fuelEconomy }) => acc + Number(fuelEconomy),
    0
  );
  const averageFuelEconomy = totalFuelEconomy / fuel.length;

  const averageServiceCost = totalServiceCost / services.length;

  const totalspend = totalFuelCost + totalServiceCost;


  return (
    <div>
      <Navbar />
      <h1>Dashboard</h1>
      <CarDropdown
        userId={auth.currentUser.uid}
        setSelectedCarId={setSelectedCarId}
      />
      {error && (
        <p className="error-message">An error occurred: {error.message}</p>
      )}
  <div className="card-container">
  <div className="fuel-card">
    <i className="fas fa-calculator fuel-icon"></i>
    <h3>Total Fuel cost:</h3>
    <p>€ {totalFuelCost.toFixed(2)}</p>
  </div>
  <div className="fuel-card">
    <i className="fas fa-calculator fuel-icon"></i>
    <h3>Average fuel economy:</h3>
    <p>{`${averageFuelEconomy.toFixed(2)}L/100km`}</p>
  </div>
  <div className="fuel-card">
    <i className="fas fa-calculator fuel-icon"></i>
    <h3>Average service cost:</h3>
    <p>€ {averageServiceCost.toFixed(2)}</p>
  </div>
  <div className="fuel-card">
    <i className="fas fa-calculator fuel-icon"></i>
    <h3>Total Spend:</h3>
    <p>€ {totalspend.toFixed(2)}</p>
  </div>
  </div>






      <h2>Service Records</h2>
      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Cost</th>
            <th>Date</th>
            <th>Actions</th>

          </tr>
        </thead>
        <tbody>

          {services.map((service) => (
            
            <tr key={service.id}>
              <td>{service.description}</td>
              <td>{service.cost}</td>
              <td>{service.startDate && service.startDate.toDate().toLocaleDateString()}</td>


              <td>
        <button onClick={() => handleDeleteService(service.id)}>Delete</button>
      </td>
            </tr>
          ))}
        </tbody>
      </table>

     {/* <FuelChart
      carId={selectedCarId}
      setSelectedCarId={setSelectedCarId}
          /> */}
    

      <h2>Fuel Records</h2>
      <table>
        <thead>
          <tr>
            <th>Cost</th>
            <th>Liters</th>
            <th>Kilometer's Driven</th>
            <th>Fuel Economy L/100KM</th>
            <th>Date</th>
            <th>Actions</th>


          </tr>
        </thead>
        <tbody>
          {fuel.map((fuel) => (
            <tr key={fuel.id}>
              <td>{fuel.cost}</td>
              <td>{fuel.litres}</td>
              <td>{fuel.kilometersDriven}</td>
              <td>{fuel.fuelEconomy}</td>
              <td>{fuel.startDate && fuel.startDate.toDate().toLocaleDateString()}</td>

              <td>
              <button onClick={() => handleDeleteFuel(fuel.id)}>Delete</button>
      </td>

            </tr>
          ))}
        </tbody>
      </table>

      <h2>Car's</h2>
      <table>
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Actions</th>

          </tr>
        </thead>
        <tbody>
          {car.map((car) => (
            <tr key={car.id}>
              <td>{car.make}</td>
              <td>{car.model}</td>
              <td>{car.year}</td>
              <td>
              <button onClick={() => handleDeleteCar(car.id)}>Delete</button>
      </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
      <div>

</div>

</div>

    </div>




  );
}

export default Dashboard;
