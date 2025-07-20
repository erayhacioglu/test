import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const data = [
  { month: 'Ocak', users: 120 },
  { month: 'Şubat', users: 210 },
  { month: 'Mart', users: 320 },
  { month: 'Nisan', users: 450 },
  { month: 'Mayıs', users: 380 },
  { month: 'Haziran', users: 500 },
];

export default function MonthlyGrowthBarChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" stroke="#555" />
        <YAxis stroke="#555" />
        <Tooltip />
        <Legend />
        <Bar dataKey="users" fill="#8884d8" radius={[10, 10, 0, 0]} animationDuration={1500} />
      </BarChart>
    </ResponsiveContainer>
  );
}
