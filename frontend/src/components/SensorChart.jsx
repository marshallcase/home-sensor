import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const SensorChart = ({ data }) => {
  const formattedData = data.map(reading => ({
    ...reading,
    formattedTime: new Date(reading.timestamp).toLocaleString()
  }));

  return (
    <div className="h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="formattedTime" 
            angle={-45} 
            textAnchor="end"
            height={80}
          />
          <YAxis label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#8884d8" 
            name="Temperature"
            dot={true}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SensorChart;