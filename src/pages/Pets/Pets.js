import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Amplify DataStore
import { DataStore } from '@aws-amplify/datastore';
import { Pet as PetModel } from '../../models';
import { Hub } from "@aws-amplify/core";
import { withAuthenticator } from '@aws-amplify/ui-react';
import {
  Card,
  Image,
  View,
  Heading,
  Flex,
  Badge,
  Text,
  Button,
  useTheme,
} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './Pets.css';

function Pets() {

  const [pet, setPet] = useState([]);

  useEffect(()=>{
    
    const getDate = async () => {
      await DataStore.observeQuery(PetModel).subscribe(({ items }) => {
        setPet(items)
        console.debug(items)
      })
    }
    getDate();
  })

    return (
        <>
             <h1>Pets</h1>
            <br />
            <Link to='/pets/addPet'> Add Pets </Link>
            {/*
                    {pet.map((items) => (
            <div key={items.name}>
            <h5>{items.name}</h5>
            </div>
             ))}
                    */}
      <div class ="cards">
      {pet.map((items) => (
        <Card className="Pet-card">
        <header className='Petname'>
          {items.name}
        </header>
        <h5>{items.image}</h5>
        <h5>{items.type}</h5>
        <h5>{items.weight}</h5>
        <h5>{items.age}</h5>
        </Card>
      ))}
      </div>
      

        </>
    )
}
export default Pets