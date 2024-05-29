import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const Charts = ({ month }) => {
  const [barChartData, setBarChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const chartContainer = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    fetchBarChartData();
  }, [month]);

  const fetchBarChartData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/bar-chart?month=${month}`);
      setBarChartData(response.data);
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
      setError('Error fetching bar chart data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (chartContainer.current) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
      const newChartInstance = renderChart();
      chartInstanceRef.current = newChartInstance;
    }
  }, [barChartData]);

  const renderChart = () => {
    const labels = barChartData.map(item => item.priceRange);
    const data = barChartData.map(item => item.count);

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Number of Items',
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(75,192,192,0.4)',
          hoverBorderColor: 'rgba(0,0,0,1)',
          data: data,
        },
      ],
    };

    const options = {
      scales: {
        x: {
          type: 'category',
          labels: labels,
        },
        y: {
          beginAtZero: true,
        },
      },
    };

    const ctx = chartContainer.current.getContext('2d');
    return new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: options,
    });
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      <h1>Bar Chart</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <canvas ref={chartContainer} />
    </div>
  );
};

export default Charts;
