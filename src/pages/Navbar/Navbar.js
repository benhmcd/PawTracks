import './Navbar.css';
import React, { useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';

function Navbar() {
    const navRef = useRef();

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
                <nav ref={navRef}>
                    <NavLink to="/" style={({ isActive }) => isActive ? activeStyle : undefined } className='nav-items'>Home</NavLink>
                    <NavLink to="/pets" style={({ isActive }) => isActive ? activeStyle : undefined } className='nav-items'>Pets</NavLink>
                    <NavLink to="/clips" style={({ isActive }) => isActive ? activeStyle : undefined } className='nav-items'>Clips</NavLink>
                    <NavLink to="/tricks" style={({ isActive }) => isActive ? activeStyle : undefined } className='nav-items'>Tricks</NavLink>
                    <button> <AiOutlineUser /> Theoretical User Name</button>
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
