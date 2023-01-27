import React from 'react';
import { Link } from 'react-router-dom';

function Pets() {

    return (
        <>
            <h1>Pets</h1>
            <br />
            <Link to='/pets/koda'> Koda </Link>
        </>
    )
}

export default Pets