import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import '../styles/Navbar.scss'
import AuthDetails from "./Auth";


const Navbar = () => {
  return (
    <nav className='Navbar'>
        <div className='logo'>
            <Link to="/">MyCar</Link>
        </div>
        <ul className='ul'>
            <li>
                <NavLink exact to='/' activeClassName="active">Home</NavLink>
            </li>
            <li>
                <NavLink to='/addCar' activeClassName="active">Add Car</NavLink>
            </li>
            <li>
                <NavLink to='/addFuel' activeClassName="active">Fuel Up</NavLink>
            </li>
            <li>
                <NavLink to='/AddService' activeClassName="active">Service</NavLink>
            </li>

            <li>
                <NavLink to='/Dashboard' activeClassName="active">Dashboard</NavLink>
            </li>

            <li>
                <AuthDetails/>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar;
