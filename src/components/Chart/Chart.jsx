/* eslint-disable no-undef */
import { LineChart, Line, XAxis, YAxis } from "recharts";

const ChartComp = () => {
  const data = [
    { name: "1", uv: 400, pv: 2400, amt: 2400 },
    { name: "2", uv: 500, pv: 2800, amt: 2800 },
    { name: "3", uv: 300, pv: 1398, amt: 1398 },
    { name: "4", uv: 200, pv: 9800, amt: 9800 },
    { name: "5", uv: 278, pv: 3908, amt: 3908 },
    { name: "6", uv: 189, pv: 4800, amt: 4800 },
  ];
  return (
    <>
      <LineChart width={800} height={190} data={data}>
        <Line type="monotone" dataKey="uv" stroke="black" />
        <XAxis dataKey="name" />
        <YAxis />
      </LineChart>
    </>
  );
};

export default ChartComp;
