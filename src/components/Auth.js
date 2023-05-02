import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "./firebaseConfig";

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        setShowPopup(true);
      } else {
        setAuthUser(null);
        setShowPopup(true);
      }
    }, (error) => {
      setAuthError(error);
      setShowPopup(false);
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
        setShowPopup(true);
      })
      .catch((error) => {
        setAuthError(error.message);
      });
  };

  return (
    <div>
      {authUser ? (
        <>
          <p>{`Signed In as ${authUser.email}`}</p>
          <button onClick={userSignOut}>Sign Out</button>
        </>
      ) : (
        <p>Signed Out</p>
      )}
      {authError && <p>{authError}</p>}
      {showPopup && (
        <div>
          {authUser ? (
            <p>Signed in successfully!</p>
          ) : (
            <p>Signed out successfully!</p>
          )}
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
};


export default AuthDetails;
