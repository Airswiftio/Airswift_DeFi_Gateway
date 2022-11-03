import React, { useState } from "react";
import {
  CartesianGrid,
  Area,
  XAxis,
  YAxis,
  Bar,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import { InfoCard, DefaultButton } from "../components/";

import "./dashboard.scss";

const Dashboard = () => {
  const data = [
    { time: "1am", balance: 350, lineBal: 470 },
    { time: "1am", balance: 270, lineBal: 370 },
    { time: "3am", balance: 390, lineBal: 490 },
    { time: "3am", balance: 490, lineBal: 590 },
    { time: "5am", balance: 420, lineBal: 520 },
    { time: "5am", balance: 520, lineBal: 620 },
    { time: "7am", balance: 810, lineBal: 910 },
    { time: "7am", balance: 730, lineBal: 830 },
    { time: "9am", balance: 600, lineBal: 700 },
    { time: "9am", balance: 414, lineBal: 514 },
    { time: "11am", balance: 240, lineBal: 340 },
    { time: "11am", balance: 260, lineBal: 360 },
    { time: "1pm", balance: 240, lineBal: 340 },
    { time: "1pm", balance: 380, lineBal: 480 },
    { time: "3pm", balance: 500, lineBal: 600 },
    { time: "3pm", balance: 470, lineBal: 570 },
    { time: "5pm", balance: 410, lineBal: 510 },
    { time: "5pm", balance: 250, lineBal: 350 },
    { time: "7pm", balance: 190, lineBal: 290 },
    { time: "7pm", balance: 210, lineBal: 310 },
    { time: "9pm", balance: 195, lineBal: 295 },
    { time: "9pm", balance: 165, lineBal: 265 },
    { time: "11pm", balance: 220, lineBal: 320 },
    { time: "11pm", balance: 280, lineBal: 380 },
  ];
  const [timeframe, setTimeframe] = useState(0);
  return (
    <div>
      <div className="dashboardContent">
        <div className="cardRow">
          <InfoCard title="Total Balance" value={9898} type={0} />
          <InfoCard title="Today's Income" value={4556} type={0} />
        </div>
        <div className="balanceOverview">
          <span className="title">Balance Overview</span>
          <div className="buttonSelectors">
            <button
              onClick={() => setTimeframe(0)}
              className={timeframe === 0 ? "selected" : ""}
            >
              24H
            </button>
            <button
              onClick={() => setTimeframe(1)}
              className={timeframe === 1 ? "selected" : ""}
            >
              7D
            </button>
            <button
              onClick={() => setTimeframe(2)}
              className={timeframe === 2 ? "selected" : ""}
            >
              1M
            </button>
          </div>
          <div className="chart">
            <ResponsiveContainer width="100%" height={250}>
              <ComposedChart
                data={data}
                margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#CDF3FF" stopOpacity={0.8} />
                    <stop offset="53%" stopColor="#3ACBF6" stopOpacity={0.7} />
                    <stop offset="100%" stopColor="#6055FF" stopOpacity={0.7} />
                  </linearGradient>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#CDF3FF" stopOpacity={0.8} />
                    <stop offset="53%" stopColor="#3ACBF6" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#6055FF" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="4"
                  stroke="#FFFFFF33"
                  vertical={false}
                />
                <XAxis dataKey="time" interval={1} />
                <YAxis dataKey="balance" />
                <Area
                  type="monotone"
                  dataKey="lineBal"
                  stroke="#8884d8"
                  fillOpacity={0.7}
                  fill="url(#areaGradient)"
                />
                <Bar dataKey="balance" fill="url(#gradient)" barSize={20} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <DefaultButton title="View More" type={0} align={2} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
