import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Amplify DataStore
import { DataStore } from '@aws-amplify/datastore';
import { Pet } from '../../models';

  

function Pets() {
  const [pet, setPet] = useState([]);

  useEffect(()=>{
    const getDate = async () => {
      await DataStore.observeQuery(Pet).subscribe(({ items }) => {
        setPet(items)
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
            <div key={items.name}>
            <h5>{items.name}</h5>
            </div>
             ))}
        </>
    )
}
export default Pets