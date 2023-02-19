import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@aws-amplify/ui-react';
import './Tricks.css';

function Tricks(props) {
    /* let tricks = {
        Dog: {
            Sit: {name: 'Sit', embedId: "EDgi2sLlWAU"},
            Shake: {name: 'Shake', embedId: "G3-hec29wII"},
            Lay: {name: 'Lay', embedId: "hHKtUp9-xbc"}
        },
        Cat: {
            Come: {name: 'Come', embedId: "OFjlF7zQF_g"},
            HighFive: {name: 'High Five', embedId: "4NWS0mtjMuw"},
            Stay: {name: 'Stay', embedId: "WLetRnjCEtU"}
        },
        Bird: {
            Talk: {name: 'Talk', embedId: "PiPk8GS8UqM"},
            PlayDead: {name: 'Play Dead', embedId: "RZ4dJ7nV1wI"},
            Fly: {name: 'Fly', embedId: "oHFkF4ZQp_4"}
        }
    } */
    let tricks = props.tricks;

    let dogTricks = [];
    for(var key in tricks['Dog']) {
        dogTricks.push(<Link to={`/tricks/${key}`}><Card className='trickCard'><h2>{tricks['Dog'][key]['name']}</h2></Card></Link>);
    }

    let catTricks = [];
    for(var key in tricks['Cat']) {
        catTricks.push(<Link to={`/tricks/${key}`}><Card className='trickCard'><h2>{tricks['Cat'][key]['name']}</h2></Card></Link>);
    }

    let birdTricks = [];
    for(var key in tricks['Bird']) {
        birdTricks.push(<Link to={`/tricks/${key}`}><Card className='trickCard'><h2>{tricks['Bird'][key]['name']}</h2></Card></Link>);
    }


    return (
        <>  
            <h1>Tricks</h1>
            <br /><br />

            <h1>Dog</h1>
            <div className='cards'>
                {dogTricks}
            </div>
            <br /><br />

            <h1>Cat</h1>
            <div className='cards'>
            {catTricks}
            </div>
            <br /><br />

            <h1>Bird</h1>
            <div className='cards'>
                {birdTricks}
            </div>
            <br /><br />
        </>
    )
}

export default Tricks