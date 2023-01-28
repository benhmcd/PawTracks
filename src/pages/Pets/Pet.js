import React from 'react';
import { useParams } from 'react-router-dom';
import './Pet.css';


function Pet() {
    const {name} = useParams();
    
    return (
        <>
            <h1>Single Pet Page: {name} </h1>
        </>
    )
    
}

export default Pet