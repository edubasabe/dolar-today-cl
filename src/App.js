import React, { useState, useEffect } from 'react';
import './styles/main.css';
import Input from './components/UI/Input/Input';
import Axios from 'axios';
import {Line, LineChart,CartesianGrid, XAxis,YAxis, Tooltip, AreaChart, Area, Brush } from 'recharts';

function App() {
  const today = new Date(Date.now());
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState('');
  const [prices, setPrices] = useState([]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  }

  const handleEndDateChange = (date) => {
    setEndDate(date);
  }

  const handleGetDolarPrice = async (e) => {
    e.preventDefault();
    const [startYear, startMonth, startDay] = startDate.split('-');
    const [endYear, endMonth, endDay] = endDate.split('-');
    try {
      const startDateQuery = `/${startYear}/${startMonth}/dias_i/${startDay}`;
      const endDateQuery = `/${endYear}/${endMonth}/dias_f/${endDay}`;
      const rangeQuery = `periodo${startDateQuery + endDateQuery}`;
      const { data: { Dolares } } = await Axios.get(`https://api.sbif.cl/api-sbifv3/recursos_api/dolar/${rangeQuery}`, {
        params: {
          apikey: '9c84db4d447c80c74961a72245371245cb7ac15f',
          formato: 'json',
        }
      });
      
      const dolarPrices = Dolares.map(({ Fecha, Valor }) => {
        const amount = parseFloat(Valor.replace(/,/g , '.'));
        return { date: Fecha, price: amount};
      });

      setPrices(dolarPrices);

      console.log('handleGetDolarPrice -> Dolares', dolarPrices);
    } catch (error) {
      console.log('handleGetDolarPrice -> error', error);
    }
  }
  

  useEffect(() => {
    console.log('Done!');
  }, []);

  return (
    <div className="App">


{/* <LineChart
  width={500}
  height={300}
  data={data}
  margin={{
    top: 5, right: 30, left: 20, bottom: 5,
  }}
>
  <CartesianGrid strokeDasharray="3 3" />
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} />
  <Line type="monotone" dataKey="pv" strokeOpacity={opacity.pv} stroke="#8884d8" activeDot={{ r: 8 }} />
  <Line type="monotone" dataKey="uv" strokeOpacity={opacity.uv} stroke="#82ca9d" />
</LineChart> */}



          <LineChart width={600} height={400} data={prices} margin={{ top: 40, right: 40, bottom: 20, left: 20 }}>
            <XAxis dataKey="date" />
            <YAxis dataKey="price" />
            <CartesianGrid  stroke="#eee" vertical={false} />
            <Tooltip
              wrapperStyle={{
                borderColor: 'white',
                boxShadow: '2px 2px 3px 0px rgb(204, 204, 204)',
              }}
              contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
              labelStyle={{ fontWeight: 'bold', color: '#666666' }}
            />
            <Line dataKey="price" stroke="#ff7300" dot={true} />
            {/* <Brush dataKey="date" startIndex={prices.length - 40}>
              <AreaChart>
                <CartesianGrid />
                <YAxis hide domain={['auto', 'auto']} />
                <Area dataKey="price" stroke="#ff7300" fill="#ff7300" dot={false} />
              </AreaChart>
            </Brush> */}
          </LineChart>




      <div className="container mx-auto mt-5">
        <h1 className="text-3xl font-semibold">Dolar Today</h1>
        <div className="text-2xl font-semibold mb-4">Selecciona un rango de fechas</div>
        <div className="flex flex-row">

          <form onSubmit={(e) => handleGetDolarPrice(e)}>
            <Input 
              type="date"
              label="Desde"
              required
              onChange={(e)=> handleStartDateChange(e.target.value)} />

            <Input 
              type="date"
              label="Hasta"
              required
              onChange={(e) => handleEndDateChange(e.target.value)} />
            
            <button 
              type="submit"
              onClick={handleGetDolarPrice}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Consultar</button>
          </form>

        </div>
      </div>
    </div>
  );
}

export default App;
