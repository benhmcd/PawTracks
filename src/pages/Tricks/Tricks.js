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

    let availablePets = [];
    for(var key in tricks){
        availablePets.push(key);
    }
    console.log(availablePets);

    let dogTricks = [];
    for(var key in tricks['Dog']) {
        dogTricks.push(<Link to={`/tricks/${key}`} className='cardLinks'><Card className='trickCard'><h2>{tricks['Dog'][key]['name']}</h2></Card></Link>);
    }

    let catTricks = [];
    for(var key in tricks['Cat']) {
        catTricks.push(<Link to={`/tricks/${key}`} className='cardLinks'><Card className='trickCard'><h2>{tricks['Cat'][key]['name']}</h2></Card></Link>);
    }
    
    let birdTricks = [];
    for(var key in tricks['Bird']) {
        birdTricks.push(<Link to={`/tricks/${key}`} className='cardLinks'><Card className='trickCard'><h2>{tricks['Bird'][key]['name']}</h2></Card></Link>);
    }

    let allPets = [];

    allPets.push(dogTricks);
    allPets.push(catTricks);
    allPets.push(birdTricks);


    return (
        <>  
            <div className='mainContent'>
                <h1>Tricks Page</h1>

                <div className='trickDivider'>
                <h1 className='trickType'>Dog Tricks</h1>
                <hr className='petDivider'/>
                </div>
                <div className='cards'>
                    {dogTricks}
                </div>
                <br /><br />

                <div className='trickDivider'>
                <h1 className='trickType'>Cat Tricks</h1>
                <hr className='petDivider'/>
                </div>
                <div className='cards'>
                {catTricks}
                </div>
                <br /><br />

                <div className='trickDivider'>
                <h1 className='trickType'>Bird Tricks</h1>
                <hr className='petDivider'/>
                </div>
                <div className='cards'>
                    {birdTricks}
                </div>
                <br /><br />
            </div>
        </>
    )
}

export default Tricks