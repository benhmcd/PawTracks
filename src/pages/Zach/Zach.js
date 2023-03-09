import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Divider, Text  } from '@aws-amplify/ui-react';
import './Zach.css';

function Zach() {
return (
    <>
    <img id='nineEleven' src='/jokeImages/WorldTradeCenters.webp'></img>
    <h1 id='threat'>الموت لزاك</h1>
    <video id='hostage' loop controls src='/jokeImages/HostageVideo.mp4'></video>
    <h1 id='message'> If you EVER want to see Zach again, you must play poker tonight and watch the NC State Basketball game.</h1>
    </>
)
}

export default Zach