import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Amplify DataStore
import { DataStore } from '@aws-amplify/datastore';
import { Pet } from '../../models';

var models = ["Superman", "Batman", "Wonder Woman"]
  

function Pets() {
  const [pet, setPet] = useState([]);

  useEffect(()=>{
    const getDate = async () => {
      await DataStore.observeQuery(Pet).subscribe(({ items }) => {
        setPet(items)
      })
    }
    getDate();
   // savePets()
  })

    // async function savePets() {
    //     // Save login to database TODO:Remove, this is a poc of impimentation 
    //     // get login list TODO:Remove, this is a poc of impimentation
    //     const models = await DataStore.query(Pet);
    //     console.log(models.length)
    //   }
    //   console.log(models.length)
    
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