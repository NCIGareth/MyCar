import { useRef } from "react";
import { Link, NavLink } from 'react-router-dom'
import '../styles/Navbar.scss'
import AuthDetails from "./Auth";
import { FaBars, FaTimes } from "react-icons/fa"
import logo from '../assets/MYCar.png'


function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};


  return (
<header>
			<img src={logo} alt="MyCar" />
			<nav ref={navRef}>
            <Link to="/">MyCar</Link>
            <NavLink to='/addCar' >Add Car</NavLink>
            <NavLink to='/addFuel' >Fuel Up</NavLink>
            <NavLink to='/AddService' >Service</NavLink>
            <NavLink to='/Dashboard' >Dashboard</NavLink>

            <AuthDetails/>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar;
