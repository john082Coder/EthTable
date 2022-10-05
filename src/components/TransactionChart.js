import React from "react";
import { Tooltip } from "react-bootstrap";
import {
  
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";


const TransactionChart = ({ data }) => {
  return (
    <ResponsiveContainer className="bg-white m-3" width={"90%"} aspect={1.8}>
      <LineChart
        dot={false}
        width={700}
        height={250}
        data={data}
        margin={{ top: 25, right: 30, left: 0, bottom: 5 }}
      >
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" name="date" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TransactionChart;
