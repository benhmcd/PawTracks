import React from 'react';
import { useParams } from 'react-router-dom';
import './Clip.css';

function Clip() {
    const {id} = useParams();
    return (
        <>
            <h1>Single Clip Page: {id}</h1>
        </>
    )
}

export default Clip