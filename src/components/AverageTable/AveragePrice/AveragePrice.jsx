import React from "react";

const AveragePrice = (props) => {
  return (
    <div className={`${props.className}`}>
      <p className="uppercase text-gray-500 text-xs font-bold text-center">
        {props.title}
      </p>
      <p className="text-3xl md:text-4xl font-light text-center">
        {props.amount}
      </p>
    </div>
  );
};

export default AveragePrice;
