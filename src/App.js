import React, { useState, useEffect } from 'react';
import './styles/main.css';
import Input from './components/UI/Input/Input';

function App() {
  const today = new Date(Date.now());
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState('')

  const handleStartDateChange = (date) => {
    setStartDate(date);
  }

  const handleEndDateChange = (date) => {
    setEndDate(date);
  }

  useEffect(() => {
    console.log('Done!');
  }, []);

  return (
    <div className="App">

      <div className="container">

        <h4>Desde</h4>
        <Input 
          type="date"
          onChange={(e)=> handleStartDateChange(e.target.value)} />

        <h4>Hasta</h4>
        <Input 
          type="date"
          onChange={(e) => handleEndDateChange(e)} />
      </div>
    </div>
  );
}

export default App;
