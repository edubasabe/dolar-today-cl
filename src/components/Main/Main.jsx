import React from "react";
import RangePicker from "components/RangePicker/RangePicker";
import Chart from "components/UI/Chart/Chart";
import AverageTable from "components/AverageTable/AverageTable";
import PropTypes from "prop-types";

const Main = (props) => {
  return (
    <div className={`${props.loading ? "is-loading" : ""} Card`}>
      {props.prices.length ? (
        <>
          <AverageTable prices={props.prices} />
          <Chart prices={props.prices} />
        </>
      ) : null}
      <RangePicker onFormSubmit={props.formSubmit} />
    </div>
  );
};

Main.propTypes = {
  prices: PropTypes.array,
  loading: PropTypes.bool,
};

export default Main;
