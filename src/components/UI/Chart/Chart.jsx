import React from "react";
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
    <ResponsiveContainer width="95%" height={400}>
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
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Chart;
