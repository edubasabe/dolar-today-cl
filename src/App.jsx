import React, { useState, useEffect } from "react";
import moment from "moment";
import { instance as request, defaultParams } from "./api/index";
import { parseDolarPrices } from "./utils";
import "./styles/main.css";

import Input from "./components/UI/Input/Input";
import Chart from "./components/UI/Chart/Chart";

function App() {
  const today = new Date(Date.now());
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState("");
  const [prices, setPrices] = useState([]);

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const getThisMonthPrices = async () => {
    const now = moment().format("L");
    const [, thisMonth, thisYear] = now.split("/");
    try {
      const {
        data: { Dolares },
      } = await request.get(`${thisYear}/${thisMonth}`, {
        params: {
          ...defaultParams,
        },
      });

      const dolarPrices = parseDolarPrices(Dolares);
      setPrices(dolarPrices);
    } catch (error) {
      console.error("getThisMonthPrices -> error", error);
    }
  };

  const handleGetDolarPrice = async (e) => {
    e.preventDefault();
    const [startYear, startMonth, startDay] = startDate.split("-");
    const [endYear, endMonth, endDay] = endDate.split("-");
    try {
      const startDateQuery = `/${startYear}/${startMonth}/dias_i/${startDay}`;
      const endDateQuery = `/${endYear}/${endMonth}/dias_f/${endDay}`;
      const rangeQuery = `periodo${startDateQuery + endDateQuery}`;

      const {
        data: { Dolares },
      } = await request.get(rangeQuery);
      const dolarPrices = parseDolarPrices(Dolares);
      setPrices(dolarPrices);

      console.log("handleGetDolarPrice -> Dolares", dolarPrices);
    } catch (error) {
      console.log("handleGetDolarPrice -> error", error);
    }
  };

  useEffect(() => {
    getThisMonthPrices();
  }, []);

  return (
    <div className="App">
      <div className="container mx-auto">
        <div className="shadow-lg rounded bg-white py-5 px-4 mt-10">
          <h1 className="text-center text-4xl font-bold">
            <span role="img" aria-label="Money">
              💵
            </span>{" "}
            Dólar en Chile{" "}
            <span role="img" aria-label="Money">
              🇨🇱
            </span>{" "}
          </h1>

          <div className="flex flex-col">
            <form
              className="flex items-end px-20 justify-center"
              onSubmit={(e) => handleGetDolarPrice(e)}
            >
              <Input
                type="date"
                label="Desde"
                required
                containerclassname="max-w-md mr-4"
                onChange={(e) => handleStartDateChange(e.target.value)}
              />

              <Input
                type="date"
                label="Hasta"
                required
                containerclassname="max-w-md mr-4"
                onChange={(e) => handleEndDateChange(e.target.value)}
              />

              <button
                type="submit"
                onClick={handleGetDolarPrice}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                Consultar
              </button>
            </form>

            <Chart prices={prices} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
