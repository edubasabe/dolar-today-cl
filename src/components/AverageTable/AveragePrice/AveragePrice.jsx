import React from "react";

const AveragePrice = (props) => {
  return (
    <div className={`${props.className ? props.className : ""} AveragePrice`}>
      <p className="AveragePrice__label">{props.title}</p>
      <p className="AveragePrice__amount">{props.amount}</p>
    </div>
  );
};

export default AveragePrice;
