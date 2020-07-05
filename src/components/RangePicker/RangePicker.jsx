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
        className="RangePicker"
        onSubmit={(e) => validateFormBeforeSubmit(e)}
      >
        <Input
          type="date"
          label="Desde"
          required
          onChange={(e) => setStartDate(e.target.value)}
        />

        <Input
          type="date"
          label="Hasta"
          required
          onChange={(e) => setEndDate(e.target.value)}
        />

        <button
          type="submit"
          onClick={(e) => validateFormBeforeSubmit(e)}
          className="Button"
        >
          Consultar
        </button>

        {error && <span className="RangePicker__error">{error}</span>}
      </form>
    </>
  );
};

export default RangePicker;
