import React from "react";
import AveragePrice from "./AveragePrice/AveragePrice";

const AverageTable = (props) => {
  const calculateAverage = (numbers) => {
    const sumOfAllPrices = numbers.reduce((acc, cv) => acc + cv);
    const totalQuantityOfPrices = numbers.length;
    return (sumOfAllPrices / totalQuantityOfPrices).toFixed(2);
  };

  const calculateMin = (numbers) => Math.min(...numbers);
  const calculateMax = (numbers) => Math.max(...numbers);
  return (
    <div className="flex justify-center">
      <AveragePrice
        title="Valor Mínimo"
        amount={calculateMin(props.prices.map((item) => item.price))}
      />

      <AveragePrice
        title="Valor Promedio"
        amount={calculateAverage(props.prices.map((item) => item.price))}
        className="mx-10"
      />

      <AveragePrice
        title="Valor Máximo"
        amount={calculateMax(props.prices.map((item) => item.price))}
      />
    </div>
  );
};

export default AverageTable;
