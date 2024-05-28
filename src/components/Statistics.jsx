// src/components/Statistics.js
import React, { useState, useEffect } from 'react';
import { getStatistics } from '../api';

const Statistics = () => {
  const [statistics, setStatistics] = useState(null);
  const [month, setMonth] = useState(3); // Default to March (key: 3)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const months = {
    1: 'January', 
    2: 'February', 
    3: 'March', 
    4: 'April', 
    5: 'May', 
    6: 'June',
    7: 'July', 
    8: 'August', 
    9: 'September', 
    10: 'October', 
    11: 'November', 
    12: 'December',
  };

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  const fetchStatistics = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getStatistics({ month });
      setStatistics(response.data);
    } catch (error) {
      setError('Error fetching statistics');
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMonthChange = (e) => {
    setMonth(parseInt(e.target.value)); // Convert value to integer
  };

  return (
    <div>
      <h1>Statistics</h1>
      <div>
        <label>
          Select Month:
          <select value={month} onChange={handleMonthChange}>
            {Object.entries(months).map(([key, monthName]) => (
              <option key={key} value={key}>
                {monthName}
              </option>
            ))}
          </select>
        </label>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {statistics && (
        <div>
          <p>Total Sale Amount: {statistics.totalSaleAmount}</p>
          <p>Total Sold Items: {statistics.totalSoldItems}</p>
          <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
        </div>
      )}
    </div>
  );
};

export default Statistics;
