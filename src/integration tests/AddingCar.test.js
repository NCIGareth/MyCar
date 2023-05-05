import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddCar from "../components/AddCar";
import { auth } from "../components/firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { MemoryRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";

const email = "testuser@example.com";
const password = "testpassword";

describe("AddCar", () => {

  beforeEach(async () => {
    // Sign in as a test user
    await signInWithEmailAndPassword(auth, email, password);
  });

  afterEach(async () => {
    await act(async () => {
      await signOut(auth);
    });

  });


  it("adds a car", async () => {
    const onCarAdded = jest.fn();

    render(
      <Router>
        <AddCar onCarAdded={onCarAdded} />
      </Router>
    );

    // Fill out and submit the form
    const makeInput = screen.getByLabelText("Make:");
    const modelInput = screen.getByLabelText("Model:");
    const yearInput = screen.getByLabelText("Year:");
    const fuelTypeInput = screen.getByLabelText("Fuel Type:");
    const engineInput = screen.getByLabelText("Engine:");
    const addButton = screen.getByRole("button", { name: "Add Car" });

    fireEvent.change(makeInput, { target: { value: "Test Make" } });
    fireEvent.change(modelInput, { target: { value: "Test Model" } });
    fireEvent.change(yearInput, { target: { value: "2009-2014" } });
    fireEvent.change(fuelTypeInput, { target: { value: "petrol" } });
    fireEvent.change(engineInput, { target: { value: "1.3-1.6" } });

    await act(async () => {
    fireEvent.click(addButton);
    });

    await waitFor(() =>
      expect(screen.getByText("Car added successfully!")).toBeInTheDocument()
    );

   
    
  });
});





