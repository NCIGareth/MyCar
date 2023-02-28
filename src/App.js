import React from "react";
import Navbar from "./components/Navbar"
import "./styles/App.scss";
import SignIn from "./components/Authentication/SignIn";
import SignUp from "./components/Authentication/SignUp";


function App() {
  return (
    <div className="App">
      <Navbar/>
      <SignIn/>
      <SignUp/>
    </div>

  );

  
}
 

export default App;
