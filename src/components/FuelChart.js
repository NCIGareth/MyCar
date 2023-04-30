import React, { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import { firestore } from "./firebaseConfig";

function FuelChart({ carId }) {
  const [fuel, setFuel] = useState(null);
  const [error, setError] = useState(null);
  const [selectedCarId, setSelectedCarId] = useState(carId);
  const chartRef = useRef(null);

  useEffect(() => {
    setSelectedCarId(carId);
  }, [carId]);

  useEffect(() => {
    const unsubscribeFuel = firestore
      .collection("fuel")
      .where("carId", "==", selectedCarId)
      .onSnapshot(
        (snapshot) => {
          const fuelData = [];
          snapshot.forEach((doc) =>
            fuelData.push({ ...doc.data(), id: doc.id })
          );
          setFuel(fuelData);
        },
        (error) => {
          setError(error);
        }
      );

    return () => {
      unsubscribeFuel();
    };
  }, [selectedCarId]);

  useEffect(() => {
    if (!fuel) return;

    const fuelCosts = fuel.map((fuelItem) => fuelItem.cost);
    const fuelDates = fuel.map((fuelItem) => fuelItem.startDate.toDate());

    if (!chartRef.current) {
      chartRef.current = new Chart("fuelChart", {
        type: "line",
        data: {
          labels: fuelDates,
          datasets: [
            {
              label: "Fuel Cost",
              data: fuelCosts,
              fill: false,
              borderColor: "#4B5563",
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            xAxes: [
              {
                type: "time",
                time: {
                  unit: "day",
                },
              },
            ],
          },
        },
      });
    } else {
      chartRef.current.data.labels = fuelDates;
      chartRef.current.data.datasets[0].data = fuelCosts;
      chartRef.current.update();
    }

    return () => {
      chartRef.current.destroy();
    };
  }, [fuel]);

  if (error) {
    let errorMessage;

    if (error.code === "unavailable") {
      errorMessage =
        "Unable to connect to server. Please check your internet connection.";
    } else {
      errorMessage = error.message;
    }

    return <p className="error-message">{errorMessage}</p>;
  }

  if (!fuel) {
    return <p>Loading...</p>;
  }

  return <canvas id="fuelChart" width="400" height="400"></canvas>;
}

export default FuelChart;
