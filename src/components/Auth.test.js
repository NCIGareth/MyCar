import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React from "react";
import AuthDetails from "./Auth";
import { auth } from "./firebaseConfig";

jest.mock("firebase/auth");

describe("AuthDetails", () => {
  beforeEach(() => {
    onAuthStateChanged.mockClear();
    signOut.mockClear();
  });

  test("renders signed out state by default", async () => {
    onAuthStateChanged.mockImplementation((auth, onResolved, onRejected) => {
      onResolved(null);
      return jest.fn();
    });

    render(<AuthDetails />);

    const signedOutText = screen.getByText("Signed Out");
    expect(signedOutText).toBeInTheDocument();
  });

  test("renders signed in state when authenticated", async () => {
    const mockUser = { email: "test@example.com" };

    onAuthStateChanged.mockImplementation((auth, onResolved, onRejected) => {
      onResolved(mockUser);
      return jest.fn();
    });

    render(<AuthDetails />);

    const signedInText = screen.getByText(`Signed in as ${mockUser.email}`);
    expect(signedInText).toBeInTheDocument();
  });

  test("signs out the user when sign out button is clicked", async () => {
    const mockUser = { email: "test@example.com" };

    onAuthStateChanged.mockImplementation((auth, onResolved, onRejected) => {
      onResolved(mockUser);
      return jest.fn();
    });

    signOut.mockImplementation(() => Promise.resolve());

    render(<AuthDetails />);

    const signOutButton = screen.getByRole("button", { name: "Sign Out" });
    fireEvent.click(signOutButton);

    expect(signOut).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      const signedOutText = screen.getByText("Signed Out");
      expect(signedOutText).toBeInTheDocument();
    });
  });
});