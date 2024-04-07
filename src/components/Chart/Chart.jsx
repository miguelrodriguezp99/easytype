/* eslint-disable react/prop-types */
import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { useWordsStore } from "../../store/useWords";

const ChartComp = () => {
  const { wordsStatPoints, timeUsed } = useWordsStore();

  const prepareChartData = () => {
    let chartData = [];

    // Exclude the points with time 0
    const filteredPoints = wordsStatPoints.filter((point) => point.time > 0);
    const totalPoints = filteredPoints.length;

    // If there are no points or time used is 0, return an empty array
    if (timeUsed === 0 || totalPoints === 0) {
      return chartData;
    }

    // If there are less than 15 points (timeUsed < 16), return all points
    if (totalPoints <= 15 || timeUsed < 16) {
      chartData = filteredPoints.map((point) => ({
        name: point.time,
        wpm: point.wpm,
      }));
    } else {
      // If there are more than 15 points, calculate the interval between each point
      const interval = Math.floor((timeUsed - 1) / 14);

      for (let i = 0; i < 14; i++) {
        const currentTime = i * interval + 1; // Time starts at 1

        // Find the point closest to the current time
        const closestPoint = filteredPoints.reduce((prev, curr) =>
          Math.abs(curr.time - currentTime) < Math.abs(prev.time - currentTime)
            ? curr
            : prev
        );

        chartData.push({
          name: currentTime,
          wpm: closestPoint.wpm,
        });
      }

      // Make sure the last point is included and we dont exceed the timeUsed
      const lastPoint = filteredPoints.reduce(
        (prev, curr) =>
          curr.time <= timeUsed && curr.time > prev.time ? curr : prev,
        { time: 0, wpm: 0 } // Initial value (it will be replaced)
      );

      chartData.push({
        name: lastPoint.time,
        wpm: lastPoint.wpm,
      });
    }

    return chartData;
  };

  const dataWpm = prepareChartData();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p>{`Time: ${label}`}</p>
          <p>{`WPM: ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <LineChart width={800} height={190} data={dataWpm}>
        <Line
          type="monotone"
          dataKey="wpm"
          className="line-chart-line"
          stroke="var(--color-tertiary)"
          fill="var(--color-secondary)"
        />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </>
  );
};

export default ChartComp;
