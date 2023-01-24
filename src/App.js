// Import dependencies
import React, { useRef, useState, useEffect } from "react";
import { withAuthenticator } from '@aws-amplify/ui-react';
import "./App.css";

// Import drawing utility here
import { videoFeed, runCoco, detect, drawRectangle } from "./videoFeed";

function App({}) {
  // Main function
  runCoco();
  detect()

  useEffect(() => { runCoco() }, []);

  return (
    <div className="App">
      < videoFeed />
    </div>
  );
}

export default withAuthenticator(App);
