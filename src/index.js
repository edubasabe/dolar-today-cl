import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './App.jsx';
import dotenv from 'dotenv'
dotenv.config();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
