import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AddCar from './components/AddCar';
import FuelUp from './components/FuelUp';
import AddService from './components/AddService';
import Dashboard from './components/Dashboard';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


import{BrowserRouter as Router, Routes,Route} from 'react-router-dom' ;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Router>
    <Routes>
      <Route path='/' element={<App/>}/>
      <Route path='/AddCar' element={<AddCar/>}/>
      <Route path='/AddFuel' element={<FuelUp/>}/>
      <Route path='/AddService' element={<AddService/>}/>
      <Route path='/Dashboard' element={<Dashboard/>}/>




    </Routes>
  </Router>
  
 
);
serviceWorkerRegistration.register();


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
