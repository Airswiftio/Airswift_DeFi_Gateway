import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  Area,
  XAxis,
  YAxis,
  Bar,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import { InfoCard, DefaultButton } from "@@/components";

import "./dashboard.scss";
import { GetMerchantBaseSummary, GetMerchantPaymentStatChart } from "@@/utils/request/api";
import { useNavigate } from "react-router-dom";
import { arrListSort, explode } from "@@/utils/function";
import { loading_currency } from "@@/utils/config";

const Dashboard = () => {
  const [timeframe, setTimeframe] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);
  const [todayIncome, setTodayIncome] = useState(0);
  const [chartData, setChartData] = useState([]);
  const navigate = useNavigate();

  const getTotal = async () => {
    const res = await GetMerchantBaseSummary();
    console.log("income total",res)
    setTotalBalance(res?.data?.total_balance?.toFixed(2) ?? totalBalance.toFixed(2));
    setTodayIncome(res?.data?.today_total_payment?.toFixed(2) ?? todayIncome.toFixed(2));
  };

  const getChartData = async (gap = "24h") => {
    const res = await GetMerchantPaymentStatChart({ gap: gap });
    console.log("Data: ", res?.data);
    if (res?.code === 1000) {
      let data = res?.data?.payment_amount_stat ?? [];
      if (data?.length > 0) {
        for (const kk in data) {
          if (gap === "24h") {
            data[kk].time1 = data[kk].title.replaceAll("-", "").replaceAll(" ", "");
            data[kk].time = explode(data[kk].title, " ")[1];
          } else if (gap === "7d" || gap === "1m") {
            data[kk].time1 = data[kk].title.replaceAll("-", "");
            data[kk].time = explode(data[kk].title, "-")[1] + "." + explode(data[kk].title, "-")[2];
          }

          //todo 888 Wait for obtaining the real data before deleting random data
          const random = Math.random() * 100;
          data[kk].balance = data[kk]?.amount + random;
          data[kk].lineBal = data[kk]?.amount + random;
        }
        data = arrListSort(data, "time1");
        setChartData(data);
      }
    }
  };

  useEffect(() => {
    getTotal();
    getChartData();
    loading_currency();
  }, []);

  return (
    <div>
      <div className="dashboardContent">
        <div className="cardRow">
          <InfoCard title="Total Balance" value={totalBalance} type={0} />
          <InfoCard title="Today's Income" value={todayIncome} type={0} />
        </div>
        <div className="balanceOverview">
          <span className="title">Balance Overview</span>
          <div className="buttonSelectors">
            <button
              onClick={() => {
                setTimeframe(0);
                getChartData("24h");
              }}
              className={timeframe === 0 ? "selected" : ""}
            >
              24H
            </button>
            <button
              onClick={() => {
                setTimeframe(1);
                getChartData("7d");
              }}
              className={timeframe === 1 ? "selected" : ""}
            >
              7D
            </button>
            <button
              onClick={() => {
                setTimeframe(2);
                getChartData("1m");
              }}
              className={timeframe === 2 ? "selected" : ""}
            >
              1M
            </button>
          </div>
          <div className="chart">
            <ResponsiveContainer width="100%" height={250}>
              <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
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
                <CartesianGrid strokeDasharray="4" stroke="#FFFFFF33" vertical={false} />
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

          <DefaultButton title="View More" type={0} align={2} click={() => navigate("/assets")} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
