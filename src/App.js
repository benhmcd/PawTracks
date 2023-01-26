// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import { withAuthenticator } from '@aws-amplify/ui-react';
import * as tf from "@tensorflow/tfjs";
import "./App.css";

import Home from "./components/Home/Home"


function App({}) {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default withAuthenticator(App);
