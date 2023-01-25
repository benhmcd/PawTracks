// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import { withAuthenticator } from '@aws-amplify/ui-react';
import "./App.css";

import Home from "./componenets/Home/Home"


function App({}) {

  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default withAuthenticator(App);
