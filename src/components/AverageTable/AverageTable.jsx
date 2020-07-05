import React from "react";
import AveragePrice from "./AveragePrice/AveragePrice";
import PropTypes from "prop-types";

const AverageTable = (props) => {
  const calculateAverage = (numbers) => {
    const sumOfAllPrices = numbers.reduce((acc, cv) => acc + cv);
    const totalQuantityOfPrices = numbers.length;
    return (sumOfAllPrices / totalQuantityOfPrices).toFixed(2);
  };

  const calculateMin = (numbers) => Math.min(...numbers);
  const calculateMax = (numbers) => Math.max(...numbers);
  return (
    <div className="AverageTable">
      <AveragePrice
        title="Valor Mínimo"
        amount={calculateMin(props.prices.map((item) => item.price))}
      />

      <AveragePrice
        title="Valor Promedio"
        amount={calculateAverage(props.prices.map((item) => item.price))}
      />

      <AveragePrice
        title="Valor Máximo"
        amount={calculateMax(props.prices.map((item) => item.price))}
      />
    </div>
  );
};

AverageTable.propTypes = {
  prices: PropTypes.array,
};

export default AverageTable;
