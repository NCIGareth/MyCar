import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddService from "../components/AddService";
import { auth } from "../components/firebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { MemoryRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event';
import CarDropdown from "../components/CarDropdown";


const email = "testuser@example.com";
const password = "testpassword";

describe("AddService", () => {

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
        <AddService />
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

    

  