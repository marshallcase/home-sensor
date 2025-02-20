import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SensorChart from './SensorChart';

const Dashboard = () => {
  const [sensorData, setSensorData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const [sensorId, setSensorId] = useState('test-sensor');

  const fetchData = async () => {
    try {
      console.log(`Fetching data for sensor ${sensorId} at:`, new Date().toISOString());
      const response = await axios.get(`http://localhost:8000/api/v1/sensors/${sensorId}/data`);
      console.log('Received data:', response.data);
      
      if (Array.isArray(response.data)) {
        setSensorData(response.data);
        setLastUpdate(new Date().toISOString());
        setLoading(false);
      } else {
        console.error('Invalid data format:', response.data);
        setError('Invalid data format received');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [sensorId]); // Refetch when sensorId changes

  const handleSensorChange = (event) => {
    setSensorId(event.target.value);
  };

  if (loading) return (
    <div className="text-center p-4">
      <p>Loading sensor data...</p>
    </div>
  );

  if (error) return (
    <div className="text-center p-4 text-red-500">
      <p>Error: {error}</p>
      <button 
        onClick={fetchData}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">Sensor Readings</h2>
          <div className="mt-2">
            <select 
              value={sensorId} 
              onChange={handleSensorChange}
              className="border rounded p-1"
            >
              <option value="test-sensor">Test Sensor</option>
              <option value="1">Sensor 1</option>
            </select>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {lastUpdate && `Last updated: ${new Date(lastUpdate).toLocaleString()}`}
          <button 
            onClick={fetchData}
            className="ml-4 px-3 py-1 bg-blue-500 text-white rounded text-sm"
          >
            Refresh
          </button>
        </div>
      </div>

      {sensorData.length === 0 ? (
        <div className="text-center p-4 bg-gray-100 rounded">
          No data available for sensor {sensorId}
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow">
          <SensorChart data={sensorData} />
          <div className="mt-4">
            <h3 className="font-bold mb-2">Latest Reading:</h3>
            <p>
              Sensor ID: {sensorId}<br />
              Temperature: {sensorData[sensorData.length - 1].value}°{sensorData[sensorData.length - 1].unit[0].toUpperCase()}<br />
              Time: {new Date(sensorData[sensorData.length - 1].timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;