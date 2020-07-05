import React from "react";
import RangePicker from "components/RangePicker/RangePicker";
import Chart from "components/UI/Chart/Chart";
import AverageTable from "components/AverageTable/AverageTable";

const Main = (props) => {
  const averageTable = props.prices.length ? (
    <AverageTable prices={props.prices} />
  ) : null;
  return (
    <div className={`${props.loading ? "is-loading" : ""} Card`}>
      <Chart prices={props.prices} />
      {averageTable}
      <RangePicker onFormSubmit={props.formSubmit} />
    </div>
  );
};

export default Main;
