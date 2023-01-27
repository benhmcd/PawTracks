import React from 'react';
import { useParams } from 'react-router-dom';
import './Trick.css';

function Trick() {
    const {trick} = useParams();
    return (
        <>
            <h1>Single Clip Page: {trick}</h1>
        </>
    )
}

export default Trick