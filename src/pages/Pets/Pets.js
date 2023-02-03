import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Amplify DataStore
import { DataStore } from '@aws-amplify/datastore';
import { Pet as PetModel } from '../../models';
import { Hub } from "@aws-amplify/core";
import { withAuthenticator } from '@aws-amplify/ui-react';

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
                    {pet.map((items) => (
            <div key={items.id}>
            <Link to={`/pets/${items.id}`}>{items.name}</Link>
            </div>
             ))}
        </>
    )
}
export default Pets