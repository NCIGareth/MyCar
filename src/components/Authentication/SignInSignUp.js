import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const SignInSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    // Check if confirm password matches password
    if (isSigningUp && password !== confirmPassword) {
      setErrorMessage("Confirm password does not match password.");
      return;
    }

    // Validate email and password
    if (!email || !password) {
      setErrorMessage("Please enter a valid email and password.");
      return;
    }

    setIsLoading(true);

    try {
      if (isSigningUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccessMessage("You've successfully registered!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setSuccessMessage("You've successfully signed in!");
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>{isSigningUp ? "Sign Up" : "Sign In"}</h1>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {isSigningUp && (
          <>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </>
        )}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : isSigningUp ? "Sign Up" : "Sign In"}
        </button>
      </form>

      {errorMessage && (
        <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>
      )}

      {successMessage && (
        <p style={{ color: "green", fontWeight: "bold" }}>{successMessage}</p>
      )}

      <p>
        {isSigningUp? "Already have an account?" : "Don't have an account?"}{" "}
        <button onClick={() => setIsSigningUp(!isSigningUp)}>
          {isSigningUp ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
};

export default SignInSignUp;
