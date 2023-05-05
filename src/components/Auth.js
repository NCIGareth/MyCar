import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "./firebaseConfig";
import { useNavigate } from 'react-router-dom';
import "../styles/Auth.scss";

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const navigate = useNavigate();

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

  const userSignOut = async () => {
    setIsSigningOut(true);
    setMessage("Signing out...");
    setAuthError(null);

    try {
      await signOut(auth);
      setAuthUser(null);
      setMessage("Signed out successfully!");
      navigate('/');
    } catch (error) {
      setAuthError(error.message);
      setMessage(null);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <div>
      {isSigningOut ? (
        <p></p>
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
