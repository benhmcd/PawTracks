import React from 'react';
import { useParams } from 'react-router-dom';
import './AddPet.css';
import { PetCreateForm } from '../../ui-components';


function AddPet() {
    
    const {name} = useParams();
    return (
        <>
            <h1>Single Pet Page: {name} </h1>
            <PetCreateForm />
        </>
    )
    
}

export default AddPet