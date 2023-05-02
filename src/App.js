import React from "react";
import Navbar from "./components/Navbar"
import "./styles/App.scss";

import SignInSignUp from "./components/Authentication/SignInSignUp";


function App() {
  return (
    <div className="App">
      <Navbar/>
      <SignInSignUp/>
      
    </div>

  );

  
}
 

export default App;
