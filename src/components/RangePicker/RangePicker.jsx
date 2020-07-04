import React from "react";
import Input from "components/UI/Input/Input";

const RangePicker = (props) => {
  const handleStartDateChange = (date) => {
    props.onSetStartDate(date);
  };

  const handleEndDateChange = (date) => {
    props.onSetEndDate(date);
  };

  return (
    <div>
      <form
        className="flex items-end px-20 justify-center"
        onSubmit={props.onFormSubmit}
      >
        <Input
          type="date"
          label="Desde"
          required
          containerclassname="max-w-md mr-4 cursor-pointer"
          onChange={(e) => handleStartDateChange(e.target.value)}
        />

        <Input
          type="date"
          label="Hasta"
          required
          containerclassname="max-w-md mr-4 cursor-pointer"
          onChange={(e) => handleEndDateChange(e.target.value)}
        />

        <button
          type="submit"
          onClick={props.onFormSubmit}
          className="btn primary text-white font-bold py-2 px-4 rounded"
        >
          Consultar
        </button>
      </form>
    </div>
  );
};

export default RangePicker;
