import React from 'react';
import { Link } from 'react-router-dom';
import './Clips.css'

function Clips() {
    return (
        <>
            <h1> All Clips </h1>
            <br />
            <Link to="/clips/1"> Clip 1</Link>
            <br />
        </>
    )
}

export default Clips