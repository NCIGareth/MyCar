import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.scss'

export const Navbar = () => {
  return (
    <div className='Navbar'>
        <div className='logo'>
            MyCar
        </div>
        <nav className='item'>
            <ul className='ul'>
                <li>
                    <Link to='/'>Home</Link>
                </li>
                <li>
                    <Link to='/addCar'>Add Car</Link>
                </li>
                <li>
                    <Link to='/addFuel'>Fuel Up</Link>
                </li>
                <li>
                    <Link to='/AddService'>Service</Link>
                </li>
            </ul>
            </nav>


    </div>
  )
}

export default Navbar;
