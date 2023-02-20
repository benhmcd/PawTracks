// Import required dependencies
import React, { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { useParams } from 'react-router-dom';
import { Pet as PetModel } from '../../models';
import PhotoUpload from '../../controllers/PhotoUpload';
import PhotoDownload from '../../controllers/PhotoDownload';
import VideoUpload from '../../controllers/VideoUpload';
import VideoDownload from '../../controllers/VideoDownload';

import './Pet.css';


function Pet() {
  // Get the ID parameter from the URL using `useParams` hook
  const { id } = useParams();

  // Declare state variable to store the pet object
  const [pet, setPet] = useState([]);

  // Fetch the pet data from DataStore using the `id` parameter
  useEffect(() => {
    const getDate = async () => {
      // Use the `query` method to retrieve the pet data from DataStore
      const post = await DataStore.query(PetModel, id);
      // Update the `pet` state variable with the retrieved data
      setPet(post)
      // Log the retrieved pet data to the console
      console.log(post)
    }
    getDate();
  }, [])

  // Render the pet information on the page
  return (
    <>
      <h1>Single Pet Page: {pet.name} </h1>
      <p>Weight: {pet.weight}</p>
      <p>Age: {pet.age}</p>
      <p>Type: {pet.type}</p>
      <p>Breed: {pet.breed}</p>
      <p>Description: {pet.desc}</p>
      <br />
      <hr />
      <PhotoUpload />
      <PhotoDownload />
      <br />
      <hr />
      <VideoUpload />
      <VideoDownload />
    </>
  )
}
export default Pet
