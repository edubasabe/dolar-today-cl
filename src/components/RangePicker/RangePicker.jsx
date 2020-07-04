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
    <div>
      <form
        className="flex items-end justify-center relative"
        onSubmit={(e) => validateFormBeforeSubmit(e)}
      >
        <Input
          type="date"
          label="Desde"
          required
          containerclassname="max-w-md mr-4 cursor-pointer"
          onChange={(e) => setStartDate(e.target.value)}
        />

        <Input
          type="date"
          label="Hasta"
          required
          containerclassname="max-w-md mr-4 cursor-pointer"
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button
          type="submit"
          onClick={(e) => validateFormBeforeSubmit(e)}
          className="btn primary text-white font-bold py-2 px-4 rounded"
        >
          Consultar
        </button>

        {error && (
          <span className="absolute bottom-0 left-0 text-red-500 text-xs transform translate-y-6">
            {error}
          </span>
        )}
      </form>
    </div>
  );
};

export default RangePicker;
