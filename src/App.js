// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as tf from "@tensorflow/tfjs";
import "./App.css";

import Home from "../src/components/Home/Home"
import Trick from "./pages/Tricks/Trick";
import Tricks from "./pages/Tricks/Tricks";
import Navbar from "./pages/Navbar/Navbar";
import Pet from "./pages/Pets/Pet"
import Pets from "./pages/Pets/Pets";
import Clip from "./pages/Clips/Clip"
import Clips from "./pages/Clips/Clips";
import Footer from "./pages/Footer/Footer"
import NotFound from "./pages/NotFound/NotFound"

// Import Amplify Package's and Auth.
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';

// Amplify DataStore
import { DataStore } from '@aws-amplify/datastore';
import { LoginList } from './models';

Amplify.configure(awsconfig);
Amplify.configure(awsExports);

function App({ signOut, user }) {
  // Main function
  async function saveLogin() {

    // Save login to database TODO:Remove, this is a poc of impimentation
    await DataStore.save(
      new LoginList({
        "UID": user.username
      })
    );

    // get login list TODO:Remove, this is a poc of impimentation
    const models = await DataStore.query(LoginList);
    console.log(models.length)
  };

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/pets' element={<Pets />} />
          <Route path='/pets/:name' element={<Pet />} />
          <Route path='/clips' element={<Clips />} />
          <Route path='/clips/:id' element={<Clip />} />
          <Route path='/tricks' element={<Tricks />} />
          <Route path='/tricks/:trick' element={<Trick />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default withAuthenticator(App);
