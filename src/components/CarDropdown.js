import { useState, useEffect } from "react";
import { auth, firestore } from "./firebaseConfig";
import "../styles/CarDropdown.scss";

function CarDropdown({ userId, setSelectedCarId }) {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore
      .collection("cars")
      .where("user", "==", auth.currentUser.uid) // Filter cars by user ID
      .onSnapshot((snapshot) => {
        const carsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })).sort((a, b) => {
          if (a.make === b.make) {
            return a.model.localeCompare(b.model);
          }
          return a.make.localeCompare(b.make);
        });
        setCars(carsData);
        setIsLoading(false);
      });
    return unsubscribe;
  }, [userId]); // Re-run effect whenever userId changes

  useEffect(() => {
    if (cars.length === 1) {
      setSelectedCarId(cars[0].id);
    }
  }, [cars, setSelectedCarId]);

  const handleCarSelectionChange = (event) => {
    const selectedCarId = event.target.value;
    setSelectedCarId(selectedCarId);
  };

  if (isLoading) {
    return <select disabled><option>Loading...</option></select>;
  }

  if (cars.length === 0) {
    return <p>No cars available for this user. Please add a car.</p>;
  }

  return (
    <select onChange={handleCarSelectionChange}>
    <option value="">Select a Car</option>

      {cars.map((car) => (
        <option key={car.id} value={car.id}>
          {car.make} {car.model} ({car.year})
        </option>
      ))}
    </select>
  );
}

export default CarDropdown;
