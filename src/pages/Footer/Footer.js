import React, { useRef, useState } from 'react';
import './Footer.css'

import { Link, NavLink } from 'react-router-dom';
import { AiOutlineGithub } from 'react-icons/ai';

function Footer() {
    const footRef = useRef();

    let activeStyle = {
        textDecoration: "none",
        fontWeight: "900",
    };
    return (
        <>
            <div className='footer'>
                <Link to="/" className='navbar-logo' ><img src='/pawTracksCircleLogo512.png' id='header-logo'></img><h1 id='pawTracksLogo'> Paw Tracks</h1></Link>
                <Link to={{ pathname: "https://github.com/benhmcd/PawTracks" }} target="_blank" className='github_link' ><h5> <AiOutlineGithub/> Github Repository </h5></Link>
                <nav ref={footRef}>
                    <NavLink to="/" style={({ isActive }) => isActive ? activeStyle : undefined } className='nav-items'>Home</NavLink>
                    <NavLink to="/pets" style={({ isActive }) => isActive ? activeStyle : undefined } className='nav-items'>Pets</NavLink>
                    <NavLink to="/clips" style={({ isActive }) => isActive ? activeStyle : undefined } className='nav-items'>Clips</NavLink>
                    <NavLink to="/tricks" style={({ isActive }) => isActive ? activeStyle : undefined } className='nav-items'>Tricks</NavLink>
                </nav>
            </div>
        </>
    )
}

export default Footer