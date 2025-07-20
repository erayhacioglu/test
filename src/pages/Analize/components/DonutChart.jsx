import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'İstanbul', value: 400 },
  { name: 'Ankara', value: 300 },
  { name: 'İzmir', value: 200 },
  { name: 'Bursa', value: 100 },
  { name: 'Diğer', value: 50 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A28FFF'];

export default function DonutChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={110}
          fill="#8884d8"
          paddingAngle={4}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
          cornerRadius={8}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value} ziyaretçi`} />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
}
