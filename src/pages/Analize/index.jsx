import React from "react";
import "./analize.scss";

import SmoothLineAreaChart from "./components/SmoothLineAreaChart";
import DonutChart from "./components/DonutChart";
import MonthlyGrowthBarChart from "./components/MonthlyGrowthBarChart";
import UserTypeRadialChart from "./components/UserTypeRadialChart";
import InteractionList from "./components/InteractionList";
import LocationReportChart from "./components/LocationReportChart";

export default function DashboardPage() {
  return (
    <div className="page">
      <h1 className="title">Kullanıcı Analiz Dashboard</h1>

      <div className="grid-container">
        <div className="chart-box">
          <h2 className="chart-title">Günlük Ziyaret ve Tıklama</h2>
          <SmoothLineAreaChart />
        </div>

        <div className="chart-box">
          <h2 className="chart-title">Lokasyon Dağılımı</h2>
          <DonutChart />
        </div>

        <div className="chart-box">
          <h2 className="chart-title">Aylık Büyüme</h2>
          <MonthlyGrowthBarChart />
        </div>

        <div className="chart-box">
          <h2 className="chart-title">Kullanıcı Türü Dağılımı</h2>
          <UserTypeRadialChart />
        </div>
      </div>

      <div className="grid-container">

<LocationReportChart
  cardId={1}
  type="DOWNLOAD"
  start="2025-05-01"
  end="2025-05-17"
/>

        <div className="grid-container">
          <div className="chart-box">
            <h2 className="chart-title">Kullanıcı Türü Dağılımı</h2>

            <InteractionList cardId={1} />
          </div>
        </div>
      </div>
    </div>
  );
}
