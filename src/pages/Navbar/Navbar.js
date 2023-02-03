import './Navbar.css';
import React, { useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';

function Navbar(props) {
    const navRef = useRef();
    const [open, setOpen] = useState(false);

    let activeStyle = {
        textDecoration: "none",
        fontWeight: "900",
    }; 

    function showNavbar() {
        navRef.current.classList.toggle('responsive_nav');
    }

    return (
        <>
            <div className='navbar'>
                <Link to="/" className='navbar-logo' ><img src='/pawTracksCircleLogo512.png' id='header-logo'></img><h1 id='pawTracksLogo'> Paw Tracks</h1></Link>
                <nav ref={navRef} id="navItems">
                    <NavLink to="/" style={({ isActive }) => isActive ? activeStyle : undefined } className='nav-items'>Home</NavLink>
                    <NavLink to="/pets" style={({ isActive }) => isActive ? activeStyle : undefined } className='nav-items'>Pets</NavLink>
                    <NavLink to="/clips" style={({ isActive }) => isActive ? activeStyle : undefined } className='nav-items'>Clips</NavLink>
                    <NavLink to="/tricks" style={({ isActive }) => isActive ? activeStyle : undefined } className='nav-items'>Tricks</NavLink>
                    <NavLink  to="/profile" style={({ isActive }) => isActive ? activeStyle : undefined } className='nav-items' id="profileLink"
                    onClick={() => setOpen(!open)}> <AiOutlineUser /> Hello, {props.firstName}</NavLink>

                    <button id="navSignOut" onClick={props.signOut}> Sign Out</button>
                    
                    <button className='nav-btn nav-close-btn' onClick={showNavbar}>
                        <FaTimes />
                    </button>
                </nav>
                <button className='nav-btn' onClick={showNavbar}>
                    <FaBars />
                </button>
            </div>
        </>
    )
}

export default Navbar
