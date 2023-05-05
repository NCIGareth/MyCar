import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddFuel from "../components/FuelUp";
import { auth } from "../components/firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { MemoryRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import CarDropdown from "../components/CarDropdown";


const email = "testuser@example.com";
const password = "testpassword";

describe("AddFuelUp", () => {

  beforeEach(async () => {
    // Sign in as a test user
    await signInWithEmailAndPassword(auth, email, password);
  });

  afterEach(async () => {
    await act(async () => {
      await signOut(auth);
    });

  });

  it("renders a car dropdown with 'Loading...' while data is being loaded", async () => {
    const userId = auth.currentUser.uid;
  
    render(
      <Router>
        <AddFuel />
        <CarDropdown userId={userId} setSelectedCarId={"QQrvb0R26x1okHEzS3zm"} />
      </Router>
    );
  
    const dropdown = screen.getByLabelText("Select a car:");
  
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toBeDisabled();
    await waitFor(() => {
    expect(dropdown.value === "Loading...");
  });

  });
});

    

  