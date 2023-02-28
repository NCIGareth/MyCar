import React from "react";
import Navbar from "./components/Navbar"
import "./styles/App.scss";
import SignIn from "./components/Authentication/SignIn";
import SignUp from "./components/Authentication/SignUp";
import AuthDetails from "./components/Auth";


function App() {
  return (
    <div className="App">
      <Navbar/>
      <SignIn/>
      <SignUp/>
      <AuthDetails/>
    </div>

  );

  
}
 

export default App;
