/* eslint-disable react/prop-types */
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const InfoAndChart = () => {
  return (
    <section className="info-and-chart">
      <div className="info-tests">
        <div className="info-test">
          <p>total tests started</p>
          <div className="info-test-textxl">1.32</div>
          <div className="info-test-textsm">billion</div>
        </div>
        <div className="info-test">
          <p>total typing time</p>
          <div className="info-test-textxl">1000</div>
          <div className="info-test-textsm">years</div>
        </div>
        <div className="info-test">
          <p>total tests completed</p>
          <div className="info-test-textxl">440</div>
          <div className="info-test-textsm">million</div>
        </div>
      </div>
      <div className="chart-container">
        <Chart />
        <p>distibution of time 60 leaderboard results (wpm)</p>
      </div>
    </section>
  );
};

export const Chart = () => {
  const data = [
    { name: "0", users: 83 },
    { name: "10", users: 875 },
    { name: "20", users: 4099 },
    { name: "30", users: 12297 },
    { name: "40", users: 24195 },
    { name: "50", users: 34992 },
    { name: "60", users: 41239 },
    { name: "70", users: 41319 },
    { name: "80", users: 36523 },
    { name: "90", users: 29728 },
    { name: "100", users: 23881 },
    { name: "110", users: 10192 },
    { name: "130", users: 5810 },
    { name: "140", users: 3398 },
    { name: "150", users: 1844 },
    { name: "160", users: 965 },
    { name: "170", users: 450 },
    { name: "180", users: 198 },
    { name: "190", users: 116 },
    { name: "200", users: 57 },
    { name: "210", users: 21 },
    { name: "220", users: 21 },
    { name: "230", users: 4 },
    { name: "240", users: 5 },
    { name: "250", users: 2 },
    { name: "260", users: 2 },
    { name: "270", users: 1 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p>{`wpm: ${label}`}</p>
          <p>{`users: ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={1000}
        height={300}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 0 }}
      >
        <Bar type="monotone" dataKey="users" className="bar" />
        <XAxis
          dataKey="name"
          className="bar-xaxis"
          style={{ overflow: "visible" }}
        />
        <YAxis domain={[0, "dataMax"]} />
        <Tooltip content={<CustomTooltip />} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default InfoAndChart;
