// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as tf from "@tensorflow/tfjs";
import "./App.css";

import Home from "./pages/Home/Home";
import Trick from "./pages/Tricks/Trick";
import Tricks from "./pages/Tricks/Tricks";
import Navbar from "./pages/Navbar/Navbar";
import AddPet from "./pages/Pets/AddPet";
import Pet from "./pages/Pets/Pet";
import Pets from "./pages/Pets/Pets";
import Clip from "./pages/Clips/Clip"
import Clips from "./pages/Clips/Clips";
import Footer from "./pages/Footer/Footer";
import NotFound from "./pages/NotFound/NotFound";
import Profile from "./pages/Profile/Profile";

// Import Amplify Package's and Auth
import { Amplify, API, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

// Amplify DataStore
import { DataStore } from '@aws-amplify/datastore';
import { LoginList } from './models';

function App({ signOut, user }) {
  // Main function
  // getPets()
 
  useEffect(() => {
    saveLogin()
  },)

  async function saveLogin() {
    const models = await DataStore.query(LoginList);
    
    // clear the data store, must be run every login
    DataStore.clear();                                                        

    //test code TODO: Delete 
    console.log(models.length);
    console.log("User Obj: " + Object.getOwnPropertyNames(user.attributes));
    console.log(user.attributes.name.split(' ')[0]);
    console.log(Auth.currentAuthenticatedUser());
  };

  return (

    <div className="App">
      <Router>
        <Navbar firstName={user.attributes.name.split(' ')[0]} signOut={signOut}> </Navbar>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pets' element={<Pets />} />
          <Route path='/pets/addPet' element={<AddPet />} />
          <Route path='/pets/:name' element={<Pet />} />
          <Route path='/clips' element={<Clips />} />
          <Route path='/clips/:id' element={<Clip />} />
          <Route path='/tricks' element={<Tricks />} />
          <Route path='/tricks/:trick' element={<Trick />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}
export default withAuthenticator(App);
