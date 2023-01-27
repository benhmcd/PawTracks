import React from 'react';
import { Link } from 'react-router-dom';
import { PetCreateForm } from '../../ui-components';

function Pets() {

    return (
        <>
            <h1>Pets</h1>
            <br />
            <Link to='/pets/addPet'> Add Pets </Link>
        </>
    )
}

export default Pets