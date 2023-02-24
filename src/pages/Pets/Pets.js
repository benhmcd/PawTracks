// Import required dependencies
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Amplify DataStore
import { DataStore } from '@aws-amplify/datastore';
import { Pet as PetModel } from '../../models';
import { Hub } from "@aws-amplify/core";
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Card, Divider } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './Pets.css';
import { Storage } from '@aws-amplify/storage';
import { MdOutlineEdit } from 'react-icons/md';
import { RiDeleteBin5Line } from 'react-icons/ri';


function Pets() {

  const [pet, setPet] = useState([]);
  const [imageURLs, setImageURLs] = useState({});

  useEffect(() => {
    // an async function to fetch the data and subscribe to changes
    const getDate = async () => {
      // clear the DataStore before observing changes
      await DataStore.clear();
      // observe changes to the PetModel and update the state
      const subscription = DataStore.observeQuery(PetModel).subscribe(({ items }) => {
        setPet(items)
        console.log(items)
      });
    };
    // call the function to fetch the data
    getDate();
  }, []) //  added ", []" which should make the call go only once

  useEffect(() => {
    const getImageURL = async (id) => {
      const imageKey = `${id}.png`;
      try {
        const url = await Storage.get(`${id}.png`, { level: "private" });
        console.log(url);
        setImageURLs((prevURLs) => ({
          ...prevURLs,
          [id]: url,
        }));
      } catch (error) {
        console.error('Error fetching image URL:', error);
      }
    };
    pet.forEach((item) => getImageURL(item.id));
  }, [pet]);

  const handleDelete = async (petDelete) => {
    try{
      await DataStore.delete(petDelete);
    }
    catch(error){
      console.error("Failed to delete pet. ", error);
    }
  }

  return (
    <>
      <h1>Pets</h1>
      <br />
      <Link to='/pets/addPet'> Add Pets </Link>
      <div className="cards">
        {pet.map((items) => (
          <Card className="pet-card">
            <div className="pet-head">
              <header className='pet-name'>
                {items.name}
              </header>
            </div>
            <Divider />
            {imageURLs[items.id] && (
              <div className="pet-image-container">
                <img src={imageURLs[items.id]} alt={items.name} className="pet-image" />
              </div>
            )}
            <div className='pet-body'>
              <h5>{items.image}</h5>
              <h5>Breed:</h5> <p>{items.type}</p>
              <h5>Weight:</h5> <p>{items.weight}</p>
              <h5>Age:</h5> <p>{items.age}</p>
            </div>
            <div className="pet-buttons">
              <Link to={`/pets/${items.id}`} key={items.id} className="edit-link">
                <MdOutlineEdit size={'1.5rem'} color={'black'}/>
              </Link>
              <button className='delete-button' onClick={() => handleDelete(items)}><RiDeleteBin5Line size={'1.5rem'} color={'black'}/></button>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}
export default Pets