import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "./firebaseConfig";

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
      setMessage(null);
    }, (error) => {
      setAuthError(error.message);
      setMessage(null);
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    setIsLoading(true);
    setMessage("Signing out...");
    setAuthError(null);
    signOut(auth)
      .then(() => {
        setIsLoading(false);
        setAuthUser(null);
        setMessage("Signed out successfully!");
      })
      .catch((error) => {
        setIsLoading(false);
        setAuthError(error.message);
        setMessage(null);
      });
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : authUser ? (
        <>
          <p>{`Signed in as ${authUser.email}`}</p>
          <button onClick={userSignOut}>Sign Out</button>
        </>
      ) : (
        <p>Signed Out</p>
      )}
      {authError && <p>{authError}</p>}
      {message && <p>{message}</p>}
    </div>
  );
};

export default AuthDetails;
