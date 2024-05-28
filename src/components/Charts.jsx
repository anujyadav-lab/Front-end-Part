// src/components/Charts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Charts = () => {
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [month, setMonth] = useState('2023-03'); // default month

  useEffect(() => {
    fetchBarChartData();
    fetchPieChartData();
  }, [month]);


  const fetchBarChartData = async () => {
    
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/bar-chart?month=${month}`);
      setBarChartData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
      setError('Error fetching bar chart data');
    } finally {
      setLoading(false);
    }
  };

  const fetchPieChartData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/pie-chart?month=${month}`);
      setPieChartData(response.data);
    } catch (error) {
      console.error('Error fetching pie chart data:', error);
      setError('Error fetching pie chart data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Charts</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {/* Render your charts here using barChartData and pieChartData */}
    </div>
  );
};

export default Charts;
