// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";

// Import required model here
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";

// Import drawing utility here
import { videoFeed, runCoco, detect, drawRectangle } from "./videoFeed";

// Import Amplify Package's and Auth
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
  runCoco();
  detect()

  useEffect(()=>{runCoco()},[]);

  return (
    < videoFeed/>
  );
}

export default withAuthenticator(App);
