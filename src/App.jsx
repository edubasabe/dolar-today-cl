import React, { useState, useEffect } from "react";
import moment from "moment";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { instance as request, defaultParams } from "./api/index";
import { parseDolarPrices } from "./utils";

import Chart from "./components/UI/Chart/Chart";
import Header from "./components/Header/Header";
import RangePicker from "./components/RangePicker/RangePicker";
import AverageTable from "components/AverageTable/AverageTable";
import swal from "@sweetalert/with-react";

function App() {
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
      swal(
        <div>
          <h1>Hello world!</h1>
          <p>This is now rendered with JSX!</p>
        </div>
      );
      throw new Error(error);
    } finally {
      endLoader();
    }
  };

  const handleFormSubmit = async ({ startDate, endDate }) => {
    startLoader();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const averageTable = prices.length ? <AverageTable prices={prices} /> : null;
  return (
    <div className="App">
      <div className="container">
        <Header />
        <div
          className={`${
            isLoading ? "is-loading" : ""
          } Card px-5 shadow-lg rounded sm:bg-white md:py-10 md:px-16 mt-5 max-w-3xl mx-auto`}
        >
          <div className="flex flex-col">
            <Chart prices={prices} />
            {averageTable}
            <RangePicker
              onFormSubmit={(dateRange) => handleFormSubmit(dateRange)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
