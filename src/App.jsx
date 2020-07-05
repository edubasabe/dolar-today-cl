/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import moment from "moment";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { instance as request, defaultParams } from "./api/index";
import { parseDolarPrices } from "./utils";

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import swal from "sweetalert";

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
      if (!error.status) {
        swal({
          title: "Error de conexión",
          text: "Ups! Parece que hay un error de la conexión a internet",
          icon: "error",
          button: "Cerrar",
        });
      }
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
      if (!error.status) {
        swal({
          title: "Error de conexión",
          text: "Ups! Parece que hay un error de la conexión a internet",
          icon: "error",
          button: "Cerrar",
        });
      }
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
      <div className="container">
        <Header />
        <Main
          prices={prices}
          loading={isLoading}
          formSubmit={(dateRange) => handleFormSubmit(dateRange)}
        />
      </div>
    </div>
  );
}

export default App;
