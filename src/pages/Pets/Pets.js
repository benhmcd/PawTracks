// Import required dependencies
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Amplify DataStore
import { DataStore } from '@aws-amplify/datastore';
import { Pet as PetModel } from '../../models';
import { Hub } from "@aws-amplify/core";
import { withAuthenticator } from '@aws-amplify/ui-react';
import { Card, Divider, Loader } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './Pets.css';
import { Storage } from '@aws-amplify/storage';
import { MdOutlineEdit } from 'react-icons/md';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { IconContext } from "react-icons";


function Pets() {

  const [pets, setPet] = useState([]);
  const [imageURLs, setImageURLs] = useState({});
  const [isLoading, setIsLoading] = useState(true); // add a loading state

  let subscription; // declare subscription outside of the useEffect callback

  useEffect(() => {
    // an async function to fetch the data and subscribe to changes
    const getDate = async () => {
      // clear the DataStore before observing changes
      await DataStore.clear();
      // observe changes to the PetModel and update the state
      const subscription = DataStore.observeQuery(PetModel).subscribe(({ items }) => {
        setPet(items)
        console.log(item)
      });
    };
    // call the function to fetch the data
    getDate();
    return () => {
      if (subscription) {
        subscription.unsubscribe();
      }
    };
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
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching image URL:', error);
      }
    };
    pets.forEach((item) => getImageURL(item.id));
  }, [pets]);

  const handleDelete = async (petDelete) => {
    try {
      await DataStore.delete(petDelete);
    }
    catch (error) {
      console.error("Failed to delete pet. ", error);
    }
  }

  // Render the loading spinner conditionally based on the loading state
  if (isLoading) {
    return <div className="loading-screen"> <Loader size="large" className="loader" /> </div>;
  }

  return (
    <>
      <h1>Pets</h1>
      <br />
      <div className='addPet-container'>
        <Link to='/pets/addPet'><button className="add-button">Add Pets</button></Link>
      </div>
      <div className="cards">
        {pets.map((item) => (
          <Card className="pet-card">
            <div className='pet-content'>
              <div className="pet-head">
                <header className='pet-name'>
                  {item.name}
                </header>
              </div>
              <Divider />
              {imageURLs[item.id] && (
                <div className="pet-image-container">
                  <img src={imageURLs[item.id]} alt={item.name} className="pet-image" />
                </div>
              )}
              <div className='pet-info'>
                <h5>{item.image}</h5>
                <h5>Type:</h5> <p>{item.type[0].toUpperCase() + item.type.slice(1).toLowerCase()}</p>
                <h5>Weight:</h5> <p>{item.weight}</p>
                <h5>Age:</h5> <p>{item.age}</p>
              </div>
              <div className="pet-buttons">
                <Link to={`/pets/${item.id}`} key={item.id} className="edit-link">
                  <IconContext.Provider value={{ className: "edit-icon" }}>
                    <MdOutlineEdit />
                  </IconContext.Provider>
                </Link>
                <button className='delete-button' onClick={() => handleDelete(item)}>
                  <IconContext.Provider value={{ className: "delete-icon" }}>
                    <RiDeleteBin5Line />
                  </IconContext.Provider>
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}
export default Pets