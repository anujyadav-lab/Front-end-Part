import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Chart, BarController, BarElement, CategoryScale, LinearScale, PieController, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(BarController, BarElement, CategoryScale, LinearScale, PieController, ArcElement, Title, Tooltip, Legend);

const Charts = ({ month }) => {
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const barChartContainer = useRef(null);
  const pieChartContainer = useRef(null);
  const barChartInstanceRef = useRef(null);
  const pieChartInstanceRef = useRef(null);

  useEffect(() => {
    fetchBarChartData();
    fetchPieChartData();
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

  useEffect(() => {
    if (barChartContainer.current) {
      if (barChartInstanceRef.current) {
        barChartInstanceRef.current.destroy();
      }
      const newBarChartInstance = renderBarChart();
      barChartInstanceRef.current = newBarChartInstance;
    }
  }, [barChartData,pieChartData]);

  useEffect(() => {
    if (pieChartContainer.current) {
      if (pieChartInstanceRef.current) {
        pieChartInstanceRef.current.destroy();
      }
      const newPieChartInstance = renderPieChart();
      pieChartInstanceRef.current = newPieChartInstance;
    }
  }, [pieChartData]);

  const renderBarChart = () => {
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

    const ctx = barChartContainer.current.getContext('2d');
    return new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: options,
    });
  };

  const renderPieChart = () => {
    const labels = pieChartData.map(item => item._id);
    const data = pieChartData.map(item => item.count);

    const chartData = {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40'
          ],
          hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40'
          ]
        }
      ]
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              const label = context.label || '';
              const value = context.raw || '';
              return `${label}: ${value}`;
            }
          }
        }
      }
    };

    const ctx = pieChartContainer.current.getContext('2d');
    return new Chart(ctx, {
      type: 'pie',
      data: chartData,
      options: options,
    });
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (barChartInstanceRef.current) {
        barChartInstanceRef.current.destroy();
      }
      if (pieChartInstanceRef.current) {
        pieChartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="flex justify-center bg-orange-200 w-full p-8">
  <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-8">
    <h1 className="text-2xl font-bold mb-4">Bar Chart</h1>
    {loading && <p className="text-center">Loading...</p>}
    {error && <p className="text-center text-red-500">{error}</p>}
    <div className="mb-8">
      <canvas ref={barChartContainer} className="w-full" />
    </div>

    <h1 className="text-2xl font-bold mb-4">Pie Chart</h1>
    {loading && <p className="text-center">Loading...</p>}
    {error && <p className="text-center text-red-500">{error}</p>}
    <div>
      <canvas ref={pieChartContainer} className="w-full" />
    </div>
  </div>
</div>

  );
};

export default Charts;
