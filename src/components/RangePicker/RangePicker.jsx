import React, { useState } from "react";
import Input from "components/UI/Input/Input";
import moment from "moment";

const RangePicker = (props) => {
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const validateFormBeforeSubmit = (e) => {
    e.preventDefault();
    if (!startDate) {
      setError("Debe seleccionar la fecha desde");
      return;
    }

    if (!endDate) {
      setError("Debe seleccionar la fecha hasta");
      return;
    }

    const today = moment().utc();
    if (moment(startDate).isAfter(today) || moment(endDate).isAfter(today)) {
      setError("Las fechas no deben ser superior a la de hoy");
      return;
    }

    setError(null);
    props.onFormSubmit({
      startDate,
      endDate,
    });
  };

  return (
    <>
      <form
        className="md:flex flex-wrap xl:items-end justify-center relative"
        onSubmit={(e) => validateFormBeforeSubmit(e)}
      >
        <Input
          type="date"
          label="Desde"
          required
          containerclassname="mb-4 sm:mb-0 xl:max-w-md md:mr-4 cursor-pointer"
          onChange={(e) => setStartDate(e.target.value)}
        />

        <Input
          type="date"
          label="Hasta"
          required
          containerclassname="mb-4 sm:mb-0 xl:max-w-md md:mr-4 cursor-pointer"
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button
          type="submit"
          onClick={(e) => validateFormBeforeSubmit(e)}
          className="w-full btn primary text-white font-bold py-2 px-4 rounded"
        >
          Consultar
        </button>

        {error && (
          <span className="absolute text-center sm:text-left w-full bottom-0 left-0 text-red-500 text-xs transform translate-y-6">
            {error}
          </span>
        )}
      </form>
    </>
  );
};

export default RangePicker;
