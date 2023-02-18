import React, { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { useParams } from 'react-router-dom';
import { Pet as PetModel } from '../../models';
import FileUpload from '../../controllers/FileUpload';
import FileDownload from '../../controllers/FileDownload';

import './Pet.css';


function Pet() {
  const { id } = useParams();

  const [pet, setPet] = useState([]);


  useEffect(() => {

    const getDate = async () => {
      const post = await DataStore.query(PetModel, id);
      setPet(post)
      console.debug(post)
    }
    getDate();
  })


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
      <FileUpload />
      <FileDownload />
    </>
  )
}
export default Pet