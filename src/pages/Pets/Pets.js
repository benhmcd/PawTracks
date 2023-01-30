import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Amplify DataStore
import { DataStore } from '@aws-amplify/datastore';
import { Pet as petModel } from '../../models';

function Pets() {
  const [pet, setPet] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await DataStore.observeQuery(petModel).subscribe(({ items }) => {
        setPet(items)
      })
    }
    getData();
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
          <Link to={`/pets/${items.id}`}>{items.name}</Link>
        </div>
      ))}
    </>
  )
}
export default Pets