import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  Legend,
} from "recharts";
import { fetchMonthlyStatistics } from "../../../redux/slices/AnalizeSlice";

export default function SmoothLineAreaChart() {
  const dispatch = useDispatch();
  const monthlyStats = useSelector((state) => state.analize) || {};
  const { data = [], loading, error } = monthlyStats;

  useEffect(() => {
    dispatch(fetchMonthlyStatistics({ id: 1 }));
  }, [dispatch]);

  const chartData = Array.isArray(data) && data.length
    ? data.map((item) => ({
        month: new Date(item.month).toLocaleDateString("tr-TR", {
          month: "short",
          year: "numeric",
        }),
        visits: item.viewCount,
        downloads: item.downloadCount,
      }))
    : [];

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;
  if (!chartData.length) return <div>Veri bulunamadı</div>;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.6} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorDownloads" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.6} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="month" stroke="#555" />
        <YAxis stroke="#555" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="visits"
          name="Ziyaret"
          stroke="#8884d8"
          fillOpacity={1}
           strokeWidth={3}
          fill="url(#colorVisits)"
          activeDot={{ r: 8 }}
          animationDuration={1500}
        />
        <Line
          type="monotone"
          dataKey="downloads"
          name="İndirme"
          stroke="#82ca9d"
          strokeWidth={3}
          dot={{ r: 5 }}
          activeDot={{ r: 8 }}
          animationDuration={1500}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
