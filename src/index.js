import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './App.jsx';
import dotenv from 'dotenv'
import moment from 'moment'
import 'moment/locale/es'
dotenv.config();
moment.locale('es')

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
