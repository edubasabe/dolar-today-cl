import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import dotenv from 'dotenv'
import moment from 'moment'
import './assets/styles/main.sass'
import 'moment/locale/es'
dotenv.config();
moment.locale('es')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
