import { useState, useEffect } from "react";
import { auth, firestore } from "./firebaseConfig";
import "../styles/CarDropdown.scss";

function CarDropdown({ userId, setSelectedCarId }) {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("cars")
      .where("user", "==", auth.currentUser.uid) // Filter cars by user ID
      .onSnapshot((snapshot) => {
        const carsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCars(carsData);
      });
    return unsubscribe;
  }, [userId]); // Re-run effect whenever userId changes

  useEffect(() => {
    if (cars.length === 1) {
      setSelectedCarId(cars[0].id);
    }
  }, [cars, setSelectedCarId]);

  const handleCarSelect = (event) => {
    const selectedCarId = event.target.value;
    setSelectedCarId(selectedCarId);
  };

  return (
    <select onChange={handleCarSelect}>
      {cars.map((car) => (
        <option key={car.id} value={car.id}>
          {car.make} {car.model} ({car.year})
        </option>
      ))}
    </select>
  );
}

export default CarDropdown;
