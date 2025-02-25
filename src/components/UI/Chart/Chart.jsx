import React from "react";
import PropTypes from "prop-types";

import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  Brush,
  ResponsiveContainer,
} from "recharts";

const Chart = (props) => {
  const mainGreen = "#53B670";
  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={props.prices}
        margin={{ top: 40, right: 40, bottom: 20, left: 20 }}
      >
        <XAxis dataKey="date" />
        <YAxis dataKey="price" />
        <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
        <Tooltip
          wrapperStyle={{
            borderColor: "white",
            boxShadow: "2px 2px 3px 0px rgb(204, 204, 204)",
          }}
          contentStyle={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
          labelStyle={{ fontWeight: "bold", color: "#666666" }}
        />
        {/* <Line dataKey="price" stroke="#ff7300" dot={true} /> */}
        <Area
          type="monotone"
          dataKey="price"
          stroke={mainGreen}
          fill={mainGreen}
          dot={true}
        />
        {props.prices.length > 60 ? (
          <Brush dataKey="date" startIndex={props.prices.length / 2}>
            <AreaChart>
              <CartesianGrid />
              <YAxis hide domain={["auto", "auto"]} />
              <Area
                dataKey="price"
                stroke={mainGreen}
                fill={mainGreen}
                dot={false}
              />
            </AreaChart>
          </Brush>
        ) : null}
      </AreaChart>
    </ResponsiveContainer>
  );
};

Chart.propTypes = {
  prices: PropTypes.array,
};

export default Chart;
