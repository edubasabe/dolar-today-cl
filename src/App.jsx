import React, { useState, useEffect } from "react";
import moment from "moment";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { instance as request, defaultParams } from "./api/index";
import { parseDolarPrices } from "./utils";
import "./styles/main.css";

import Chart from "./components/UI/Chart/Chart";
import Header from "./components/Header/Header";
import RangePicker from "./components/RangePicker/RangePicker";
import AverageTable from "components/AverageTable/AverageTable";

function App() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [prices, setPrices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getThisMonthPrices = async () => {
    startLoader();
    const now = moment().format("DD-MM-YYYY");
    const [, thisMonth, thisYear] = now.split("-");
    try {
      const {
        data: { Dolares },
      } = await request.get(`${thisYear}/${thisMonth}`, {
        params: {
          ...defaultParams,
        },
      });

      const dolarPrices = await parseDolarPrices(Dolares);
      setPrices(dolarPrices);
    } catch (error) {
      throw new Error(error);
    } finally {
      endLoader();
    }
  };

  const handleFormSubmit = async (e) => {
    startLoader();
    e.preventDefault();
    const [startDay, startMonth, startYear] = moment(startDate)
      .format("DD-MM-YYYY")
      .split("-");
    const [endDay, endMonth, endYear] = moment(endDate)
      .format("DD-MM-YYYY")
      .split("-");
    try {
      const startDateQuery = `/${startYear}/${startMonth}/dias_i/${startDay}`;
      const endDateQuery = `/${endYear}/${endMonth}/dias_f/${endDay}`;
      const rangeQuery = `periodo${startDateQuery + endDateQuery}`;

      const {
        data: { Dolares },
      } = await request.get(rangeQuery, {
        params: {
          ...defaultParams,
        },
      });
      const dolarPrices = parseDolarPrices(Dolares);
      setPrices(dolarPrices);
    } catch (error) {
      throw new Error(error);
    } finally {
      endLoader();
    }
  };

  const startLoader = () => {
    NProgress.start();
    setIsLoading(true);
  };

  const endLoader = () => {
    NProgress.done();
    setIsLoading(false);
  };

  useEffect(() => {
    getThisMonthPrices();
  }, []);

  return (
    <div className="App">
      <div className="container mx-auto flex flex-col flex-wrap justify-center">
        <Header className="mt-5" />
        <div
          className={`${
            isLoading ? "is-loading" : ""
          } shadow-lg rounded bg-white py-5 px-4 mt-5 max-w-3xl mx-auto`}
        >
          <div className="flex flex-col">
            <RangePicker
              onSetStartDate={(date) => setStartDate(date)}
              onSetEndDate={(date) => setEndDate(date)}
              onFormSubmit={handleFormSubmit}
            />

            <Chart prices={prices} />

            {prices.length ? <AverageTable prices={prices} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
