import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';


import { Amplify, AuthModeStrategyType } from 'aws-amplify'
import awsconfig from './aws-exports'


Amplify.configure({
  ...awsconfig,
  DataStore: {
    authModeStrategyType: AuthModeStrategyType.MULTI_AUTH
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

